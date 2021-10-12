from google.cloud import firestore
from random import randint

client = firestore.Client()


# TODO: Use the data to calculate speed in simple recommender system
# Trigger: /users/{username}/gameData/{userGameData}
def get_recommended_difficulty(data, context):
    path_parts = context.resource.split('/documents/')[1].split('/')
    user_collection_path = path_parts[0]
    user_doc = path_parts[1]

    event_id = context.event_id

    affected_user_doc = client.collection(user_collection_path).document(user_doc)

    if should_update(affected_user_doc, event_id):
        document_data = {
            "lastFunctionWriteId": event_id,
            "settings": {
                "speed": randint(1, 5)
            }
        }
        affected_user_doc.set(document_data, merge=True)
    else:
        print("Document has already been updated with this event")


def should_update(user_doc_ref, event_id):
    return user_doc_ref.get(field_paths={"lastFunctionWriteId"}).exists and \
           user_doc_ref.get(field_paths={"lastFunctionWriteId"}) != event_id
