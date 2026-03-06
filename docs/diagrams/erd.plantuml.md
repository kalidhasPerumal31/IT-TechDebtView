@startuml
entity Posture {
  * id : int
  * name : string
}
entity Risk {
  * id : int
  * description : string
}
entity User {
  * id : int
  * username : string
}
entity Application {
  * id : int
  * name : string
  posture_id : int
  risk_id : int
  integration_id : int
}
entity Integration {
  * id : int
  * type : string
}
Posture ||--o{ Application : has
Risk ||--o{ Application : has
User ||--o{ Application : accesses
Application ||--o{ Integration : uses
@enduml
