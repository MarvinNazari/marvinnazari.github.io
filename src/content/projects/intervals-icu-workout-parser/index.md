---
title: "Intervals.icu Workout Parser"
description: "TypeScript library to parse and build Intervals.icu workout text format."
date: "Jan 12 2025"
repoURL: "https://github.com/MarvinNazari/intervals-icu-workout-parser"
---

A TypeScript library for parsing and building [Intervals.icu](https://intervals.icu) workout text format. Convert workout text into a structured AST or programmatically construct new workouts.

## Features

**Parsing**
- Convert workout text into structured AST
- Parse with zone info to calculate duration, TSS, and intensity factor
- Support for section and step repeat calculations

**Building**
- Fluent builder API for creating workouts programmatically
- Serialize workouts back to Intervals.icu text format
- Configure duration, power/HR/pace targets, cadence, and ramps

## Example

```typescript
import { parse, build } from 'intervals-icu-workout-parser';

// Parse existing workout
const ast = parse('5m @ 50% + 3x(10m @ 90% + 5m @ 60%) + 5m @ 50%');

// Build a workout programmatically
const workout = build()
  .step('5m', { power: '50%' })
  .repeat(3, (r) => r
    .step('10m', { power: '90%' })
    .step('5m', { power: '60%' })
  )
  .step('5m', { power: '50%' })
  .toString();
```
