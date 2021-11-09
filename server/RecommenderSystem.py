class RecommenderSystem:
    def __init__(self):
        self.settings = {
            "obstacleSpeed": 2,
            "height": {
                "max": 0.5,
                "min": 0.4
            },
            "width": {
                "max": 400,
                "min": 250
            },
            "objects": 1,
            "lives": 3
        }

    def calculate_new_difficulty(self, score, previous_settings):
        # The previous player does not have any previous game data, so they get the default settings
        # This should be replaced
        if not previous_settings or previous_settings == {} or "obstacleSpeed" not in previous_settings\
                or "height" not in previous_settings or "width" not in previous_settings\
                or "objects" not in previous_settings or "lives" not in previous_settings:
            return
        self.calculate_new_obstacle_speed(score, previous_settings["obstacleSpeed"])
        self.calculate_new_height(score, previous_settings["height"])
        self.calculate_new_width(score, previous_settings["width"])
        self.calculate_new_amount_of_objects(score, previous_settings["objects"])
        self.calculate_new_amount_of_lives(score, previous_settings["lives"])

    def calculate_new_height(self, score, previous_height):
        prev_max, prev_min = previous_height.get("max"), previous_height.get("min")
        if score > 10 and prev_min <= 0.6 and prev_max <= 0.7:
            self.settings["height"]["max"] = prev_max + 0.1
            self.settings["height"]["min"] = prev_min + 0.1
        elif score < 6 and prev_min >= 0.4 and prev_max >= 0.5:
            self.settings["height"]["max"] = prev_max - 0.1
            self.settings["height"]["min"] = prev_min - 0.1
        else:
            self.settings["height"]["max"] = prev_max
            self.settings["height"]["min"] = prev_min

    def calculate_new_obstacle_speed(self, score, previous_obstacle_speed):
        if score > 10 and previous_obstacle_speed <= 4:
            self.settings["obstacleSpeed"] = previous_obstacle_speed + 1
        elif score < 6 and previous_obstacle_speed >= 2:
            self.settings["obstacleSpeed"] = previous_obstacle_speed - 1
        else:
            self.settings["obstacleSpeed"] = previous_obstacle_speed

    def calculate_new_width(self, score, previous_width):
        prev_max, prev_min = previous_width.get("max"), previous_width.get("min")
        if score > 10 and prev_min <= 700 and prev_max <= 850:
            self.settings["width"]["max"] = prev_max + 150
            self.settings["width"]["min"] = prev_min + 150
        elif score < 6 and prev_min >= 250 and prev_max >= 400:
            self.settings["width"]["max"] = prev_max - 150
            self.settings["width"]["min"] = prev_min - 150
        else:
            self.settings["width"]["max"] = prev_max
            self.settings["width"]["min"] = prev_min

    def calculate_new_amount_of_objects(self, score, previous_amount_of_objects):
        if score > 10 and previous_amount_of_objects == 1:
            self.settings["objects"] = previous_amount_of_objects + 1
        elif score < 6 and previous_amount_of_objects == 2:
            self.settings["objects"] = previous_amount_of_objects - 1
        else:
            self.settings["objects"] = previous_amount_of_objects

    def calculate_new_amount_of_lives(self, score, previous_amount_of_lives):
        if score > 10 and previous_amount_of_lives >= 2:
            self.settings["lives"] = previous_amount_of_lives - 1
        elif score < 6 and previous_amount_of_lives <= 2:
            self.settings["lives"] = previous_amount_of_lives + 1
        else:
            self.settings["lives"] = previous_amount_of_lives
