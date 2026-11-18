*Version 1. Last updated 18 November 2026.*

Cadence keeps strength workouts in intervals.icu, with no server of its own. A planned workout is stored in the event's description, and the sets you did are stored on the activity. Both use the same JSON, described here so other tools can read and write it.

The JSON Schema is at [wavio.co/cadence/strength-v1.schema.json](/cadence/strength-v1.schema.json). For language models and scripts, this page is also plain Markdown at [strength-format.md](/cadence/strength-format.md), and the exercises are listed one per line at [exercises.txt](/cadence/exercises.txt).

## Planned workouts

A planned strength workout is a calendar event (or a workout in the library) of type `WeightTraining`. Its description is the workout's notes, then the plan as JSON inside an HTML comment:

```
Workout B. Keep the carries heavy.

<!-- cadence-strength: {"cadence":"strength","exercises":[…],"v":1} -->
```

- The JSON is on one line. Write `<` and `>` inside it as `\u003c` and `\u003e`, so a name or note can't close the comment.
- Cadence reads the last `cadence-strength` comment. Everything outside comments is the notes. Other comments are kept as they are.
- intervals.icu keeps the comment as written and makes no workout steps from it. Both the website and Cadence hide it, so you only see the notes.

To add one through the API, create the event as usual (`POST /api/v1/athlete/{id}/events`) with `"category": "WORKOUT"`, `"type": "WeightTraining"` and the description above.

## Done sets

When a session is finished or marked done, Cadence saves the sets on the activity in a custom activity field with the code `CadenceStrength`. The field is a text field that Cadence creates the first time (it shows as Strength under Customize › Activity Fields on the website). Its value is the same JSON as a plan, with a few differences:

- It holds only the sets that were done. An exercise with no done sets is left out.
- `rest` is left out for a session logged live.
- `bodyweight` is the athlete's weight in kilograms that Weight lifted counted bodyweight sets with. It's left out when no bodyweight set counted.
- Notes are what the athlete wrote while logging, not the plan's notes.
- A session logged live also says when things happened: `started_at` when it started, and on each set `done_at`, when it was ticked, and `rest_end_at`, when the rest after it ended. Both are seconds from `started_at`. Sets ticked within seconds of each other were ticked together, so their times don't say when each was done.

intervals.icu only keeps the field when the athlete has it, so a tool writing it should check for it first. `POST …/activities/manual` drops custom fields, so set it with a `PUT` on the activity afterwards.

## The JSON

| Key | Type | |
| --- | --- | --- |
| `cadence` | `"strength"` | Required. |
| `v` | `1` | Required. The version. |
| `exercises` | array | Required. In the order they're done. |
| `bodyweight` | number | Done sets only, see above. |
| `started_at` | string | Done sets logged live only: when the session started, ISO 8601 in UTC, such as `"2026-11-17T18:02:11Z"`. |

Each exercise:

| Key | Type | |
| --- | --- | --- |
| `exercise` | object | Required. `id` and `name`, see Exercises below. |
| `measure` | one of 8 | Required. What a set records: `weight_reps`, `assisted_reps`, `weighted_reps`, `reps`, `time`, `weight_time`, `distance_time` or `weight_distance`, see Measures below. |
| `sets` | array | Required. |
| `per_side` | `true` | Each side counts on its own: 8 reps is 8 a side. Leave it out otherwise. |
| `implements` | `2` | Two dumbbells, kettlebells or cable stacks at once. A set's `kg` is then one of them. Leave it out for one. |
| `rep_range` | `true` | The reps are a range, `reps` to `reps_max`. Leave it out otherwise. |
| `rest` | integer | Seconds of rest after each set. In a superset, after each round. |
| `superset` | string | A letter, starting at `"A"`. Exercises next to each other with the same letter are done in turn, one set of each per round. |
| `note` | string | Shown under the exercise. |

Each set:

| Key | Type | |
| --- | --- | --- |
| `type` | `"warmup"` | A warm-up set. Leave it out for a working set. Only the types listed here; more may come, see Versions. |
| `reps` | integer | |
| `reps_max` | integer | The top of a rep range. |
| `seconds` | integer | |
| `meters` | number | |
| `kg` | number | Always positive. The measure says whether it's lifted, added to the body or taken off it. |
| `done_at` | integer | Done sets logged live only: seconds from `started_at` when the set was ticked. |
| `rest_end_at` | integer | Done sets logged live only: seconds from `started_at` when the rest after the set ended, by its timer, Skip or the next set. Left out when no rest ran. |

Leave out a key rather than writing `null`.

## Measures

| Measure | A set has | For example |
| --- | --- | --- |
| `weight_reps` | `kg`, `reps` | Barbell squat |
| `assisted_reps` | `kg` taken off the body, `reps` | Assisted pull-up |
| `weighted_reps` | `kg` added to the body, `reps` | Weighted pull-up |
| `reps` | `reps` | Push-up |
| `time` | `seconds` | Plank |
| `weight_time` | `kg`, `seconds` | Weighted hold |
| `distance_time` | `meters`, `seconds` | Row |
| `weight_distance` | `kg`, `meters` | Farmer's carry |

## Exercises

Exercises are named by their id in Cadence's exercise library, published at [wavio.co/cadence/exercises.json](/cadence/exercises.json) (CC BY-SA 4.0, built on [wger](https://wger.de)). Take `measure`, `per_side` and `implements` from the library's entry, so the plan reads the same without it. Look ids up there rather than making them from a name: they never change and are never reused, so some read differently from today's name. An id Cadence doesn't know is shown by its `name`, without a how-to or alternatives.

## Example

A warm-up and three sets of trap bar deadlifts with a 2½ minute rest, then dumbbell bench press and assisted pull-ups as a superset:

```json
{
  "cadence": "strength",
  "v": 1,
  "exercises": [
    {
      "exercise": {
        "id": "trap-bar-deadlift",
        "name": "Deadlift (Trap Bar)"
      },
      "measure": "weight_reps",
      "rest": 150,
      "note": "Bar close to the legs.",
      "sets": [
        { "type": "warmup", "reps": 8, "kg": 40 },
        { "reps": 5, "kg": 60 },
        { "reps": 5, "kg": 60 },
        { "reps": 5, "kg": 60 }
      ]
    },
    {
      "exercise": {
        "id": "benchpress-dumbbells",
        "name": "Bench Press (Dumbbell)"
      },
      "measure": "weight_reps",
      "implements": 2,
      "rep_range": true,
      "rest": 90,
      "superset": "A",
      "sets": [
        { "reps": 8, "reps_max": 10, "kg": 20 },
        { "reps": 8, "reps_max": 10, "kg": 20 }
      ]
    },
    {
      "exercise": {
        "id": "pull-ups-on-machine",
        "name": "Assisted Pull-Up (Machine)"
      },
      "measure": "assisted_reps",
      "superset": "A",
      "sets": [
        { "reps": 6, "kg": 28 },
        { "reps": 6, "kg": 28 }
      ]
    }
  ]
}
```

## Writing a planned session

The steps a script or a language model follows to add a workout Cadence can show:

1. Pick each exercise from [exercises.txt](/cadence/exercises.txt): its id, name and measure, and `per_side` or `implements` where the line has them. Use only ids from the list.
2. Give each set the numbers its measure needs, in kilograms, seconds and metres.
3. Write the JSON on one line and check it against the [schema](/cadence/strength-v1.schema.json). Write `<` and `>` as `\u003c` and `\u003e`.
4. Put it after the notes: `<!-- cadence-strength: {…} -->`.
5. Create the event with `"category": "WORKOUT"`, `"type": "WeightTraining"`, its date in `start_date_local`, a `name`, and that `description`.

The schema can also be given to a model as a tool's input or for structured output. Use a provider's non-strict mode: strict modes require every key and forbid others, and this format has optional keys and lets others be added.

## Versions

Cadence reads version 1 and will keep reading it.

Within version 1, new keys and new set types may be added. A writer uses only what this page and the schema list, so a typo fails the schema check. A reader that doesn't know a key ignores it and keeps it when it saves, and one that doesn't know a set's `type` treats it as a working set and keeps the type (Cadence 1.2 and later). That way drop sets and sets to failure can come without locking out an older Cadence.

A change that an older reader would get wrong gets a new `v`, for example a new measure or a change to what a number means. Cadence leaves a version it can't read untouched. Write version 1 as long as it can say what you need, so every Cadence can read it.

Questions or a format you'd like Cadence to read: [cadence@wavio.co](mailto:cadence@wavio.co).
