class RecommenderSystem:
    def __init__(self):
        self.new_speed = 2

    def calculate_new_difficulty(self, score, previous_speed):
        if score > 10 and previous_speed < 5:
            self.new_speed = previous_speed + 1
        elif score < 8 and previous_speed > 1:
            self.new_speed = previous_speed - 1
