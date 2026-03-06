# ERD (ASCII)

+-----------+      +--------------+
|  Posture  |      |  Application |
+-----------+      +--------------+
| id        |<-----| id           |
| name      |      | name         |
+-----------+      | posture_id   |
                  | risk_id      |
                  | integration_id|
                  +--------------+
                        ^
                        |
+------+         +------+------+
| Risk |         | Integration|
+------+         +------------+
| id   |         | id         |
| desc |         | type       |
+------+         +------------+
                        ^
                        |
                  +-------------+
                  |    User     |
                  +-------------+
                  | id          |
                  | username    |
                  | application_id|
                  +-------------+
