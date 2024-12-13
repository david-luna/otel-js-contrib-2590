# 2590

This repo tries to provide a environment to reproduce the issue mentioned in https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2590
where the Mysql2 istrumentation fails to export a span when latest `mysql2` module (v3.11.5) is installed.

The struncture and TS setup has been inspired from OTEL JS examples https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/examples/mysql

As for now there is no success in reproducing the error.
