import pino from "pino";
import PinoLoki from "pino-loki";

export const logger = pino(
    {
        level: "debug",
    },
    PinoLoki({
        host: Bun.env.GRAFANA_LOKI_URL || '',
        basicAuth: {
            username: Bun.env.GRAFANA_USERNAME || '',
            password:
                Bun.env.GRAFANA_PASSWORD || '',
        },
        interval: 5,
        labels: { app: "bun-app" },
    })
);
