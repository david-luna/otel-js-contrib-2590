'use strict';

import opentelemetry from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { MySQL2Instrumentation } from '@opentelemetry/instrumentation-mysql2';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export const setupTracing = (serviceName: string) => {
  //traces:
  const tracerProvider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
    resource: new Resource({
      [ATTR_SERVICE_NAME]: serviceName,
    }),
  });

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  tracerProvider.register();

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new MySQL2Instrumentation(),
    ],
    tracerProvider: tracerProvider,
  });

  return opentelemetry.trace.getTracer('mysql2-example');
};
