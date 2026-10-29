---
description: A faster way to send data
---

# Introduction

Singular REST API calls are sent over the public internet, which takes about a second depending on how they are routed, and works well in most situations. However, when you need to send data quickly, Singular also offers the data stream API.&#x20;

The data stream API sends data to compositions through a direct web socket connection so they are stable and low latency (below 300 ms).

Use data streams for any situation that requires updating data at 1 Hz or faster, from hockey and basketball clocks to sub-second penalty clocks, race car telemetry, the geo-location of planes, in-game e-sports statistics, and more.

### Understanding data streams

Data streams are set up on the Dashboard and updated with the data stream API. Payloads sent to data streams persist until new payloads arrive. Clients connecting to a data stream immediately receive the latest payload. The data streams backend includes a UTC timestamp to payloads. The client can use the timecode to calculate the latency and evaluate the age of the payload.
