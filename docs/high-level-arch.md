```mermaid

flowchart TB

    subgraph Users
        U[Business User]
    end

    subgraph Frontend["Frontend Layer"]
        SHELL[Container / Host App]
        MF1[React Microfrontend A]
        MF2[React Microfrontend B]
        MF3[React Microfrontend C]
    end

    subgraph BFF["Backend for Frontend Layer"]
        BFFAPI[BFF Service]
    end

    subgraph Services["Backend Microservices Layer"]
        S1[Customer Service]
        S2[Account Service]
        S3[Payments Service]
        S4[Notification Service]
    end

    subgraph External["External / Internal Dependencies"]
        MQ[Kafka / Message Queue]
        EXT1[Third-Party API]
        EXT2[Legacy/Internal System]
        DB1[(PostgreSQL / MySQL)]
        DB2[(MongoDB / DynamoDB)]
    end

    subgraph TestFramework["Test Automation Framework - Playwright + TypeScript"]
        PWUI[UI Tests\nMicrofrontend + Shell Validation]
        PWE2E[E2E Tests\nCritical Business Flows]
        APICHK[API / Contract Validation]
        MOCKS[Mock Services / Test Data / Stubs]
        REPORT[Test Reports / Logs / Screenshots / Traces]
    end

    subgraph CI["CI/CD with Jenkins"]
        GIT[Git Repository]
        JENKINS[Jenkins Pipeline]
        BUILD[Build + Deploy to Test Env]
        EXEC[Execute Automated Test Suites]
        PUBLISH[Publish Reports / Notify Teams]
    end

    U --> SHELL
    SHELL --> MF1
    SHELL --> MF2
    SHELL --> MF3

    MF1 --> BFFAPI
    MF2 --> BFFAPI
    MF3 --> BFFAPI

    BFFAPI --> S1
    BFFAPI --> S2
    BFFAPI --> S3
    BFFAPI --> S4

    S1 --> DB1
    S2 --> DB1
    S3 --> DB2
    S4 --> MQ

    S3 --> EXT1
    S2 --> EXT2

    GIT --> JENKINS
    JENKINS --> BUILD
    BUILD --> EXEC
    EXEC --> PWUI
    EXEC --> PWE2E
    EXEC --> APICHK
    EXEC --> MOCKS
    EXEC --> REPORT
    REPORT --> PUBLISH

    PWUI -. validates .-> SHELL
    PWUI -. validates .-> MF1
    PWUI -. validates .-> MF2
    PWUI -. validates .-> MF3

    APICHK -. validates .-> BFFAPI
    APICHK -. validates .-> S1
    APICHK -. validates .-> S2
    APICHK -. validates .-> S3
    APICHK -. validates .-> S4

    PWE2E -. validates full journey .-> SHELL
    PWE2E -. validates full journey .-> BFFAPI
    PWE2E -. validates full journey .-> S1
    PWE2E -. validates full journey .-> S2
    PWE2E -. validates full journey .-> S3

    MOCKS -. simulates .-> EXT1
    MOCKS -. simulates .-> EXT2

    ```
    