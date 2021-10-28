class RecommenderSystem:
    def __init__(self):
        self.settings = {
            "obstacleSpeed": 2,
            "height": {
                "max": 550,
                "min": 450
            },
            "width": {
                "max": 90,
                "min": 75
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
        if score > 10 and prev_min <= 640 and prev_max <= 740:
            self.settings["height"]["max"] = prev_max + 25
            self.settings["height"]["min"] = prev_min + 25
        elif score < 6 and prev_min >= 460 and prev_max >= 560:
            self.settings["height"]["max"] = prev_max - 25
            self.settings["height"]["min"] = prev_min - 25
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
        if score > 10 and prev_min <= 100 and prev_max <= 110:
            self.settings["width"]["max"] = prev_max + 10
            self.settings["width"]["min"] = prev_min + 10
        elif score < 6 and prev_min >= 85 and prev_max >= 95:
            self.settings["width"]["max"] = prev_max - 10
            self.settings["width"]["min"] = prev_min - 10
        else:
            self.settings["width"]["max"] = prev_max
            self.settings["width"]["min"] = prev_min

    def calculate_new_amount_of_objects(self, score, previous_amount_of_objects):
        if score > 10 and previous_amount_of_objects == 1:
            self.settings["objects"] = previous_amount_of_objects + 1
        elif score < 6 and previous_amount_of_objects < 2:
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
