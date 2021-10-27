from google.cloud import firestore

from RecommenderSystem import RecommenderSystem

# Get the firestore database for retrieving and inserting data
client = firestore.Client()


# Trigger: /users/{username}/gameData/{userGameData}
def get_recommended_difficulty(data, context):
    path_parts = context.resource.split('/documents/')[1].split('/')

    # Get the document paths for the user that finished a game
    user_collection_path = path_parts[0]
    user_doc = path_parts[1]
    game_data_collection_path = path_parts[2]
    game_data_doc = path_parts[3]

    # Retrieve the firestore generated event id to make the function idempotent
    event_id = context.event_id

    # Get references to the documents in firestore
    affected_user_doc = client.collection(user_collection_path).document(user_doc)
    game_data_ref = client.collection(user_collection_path).document(user_doc)\
        .collection(game_data_collection_path).document(game_data_doc)

    # Check for failed update, if no previous failed update with the same event id, update user data
    if should_update(affected_user_doc, event_id):

        # Calculate user performance based on previous settings and the user's score
        previous_settings = get_previous_settings(affected_user_doc)
        score = get_game_score(game_data_ref)
        recommender_system = RecommenderSystem()
        recommender_system.calculate_new_difficulty(score, previous_settings)

        # Create a dictionary to hold the new data we wish to insert into the database
        document_data = {
            "lastFunctionWriteId": event_id,
            "settings": recommender_system.settings
        }
        affected_user_doc.set(document_data, merge=True)
    else:
        print("Document has already been updated with this event")


def should_update(user_doc_ref, event_id):
    if user_doc_ref.get(field_paths={"lastFunctionWriteId"}).exists:
        return user_doc_ref.get(field_paths={"lastFunctionWriteId"})\
                   .to_dict().get("lastFunctionWriteId") != event_id
    return True


def get_previous_settings(user_doc_ref):
    if user_doc_ref.get(field_paths={"settings"}).exists:
        return user_doc_ref.get(field_paths={"settings"}).to_dict().get("settings")
    return {}


def get_game_score(game_data_ref):
    if game_data_ref.get(field_paths={"points"}).exists:
        return game_data_ref.get(field_paths={"points"}).to_dict().get("points")
    return 0

