# Opeteh example
> version 1.0.1

Example of opeteh library functionality

Survey system which allows real time monitoring of answers. 



Example survey files are at `/data` folder or you can create your own custom survey(shown below)

## Creating custom survey

## Requirements

Any text editor. Ideally with yaml files support but it is not needed.

### Info

Survey file has YAML structure (similiar to JSON), it is simple format which allows us to write simple computer and human understandable tree structures. 

Survey file consists of array of questions

```yaml
survey:
  - 
    type: yes-no
    title: Is this example ?
  -
    type: checkbox
    title: Which issues with the library you think i had ?
    options:
      - complicated server
      - procrastination
      - unclean code
      - bad variable names
      - not so good communication     
  -
    type: number
    title: How many hours should have been spent on this project
    min: 0
    max: 500
  -
    type: input
    title: What is this projects name ?
  -
    title: What grade should it get ? (1-5)
    type: number
    min: 1
    max: 2
```

Each question has minimally have two parameters(`type` and `title`). Then there are other needed parameters which depend on question type.



Use file above as template how to create questions

## Available question types

- `yes-no` - simple yes no answer

  - does not need any additional parameters

- `checkbox` - choose from multiple answers

  - needs array of `options` from which user can choose

  - ```yaml
    options:
      - red
      - green
      - grey
    ```

- `number` - choose number

  - needs to have defined `min` and `max` parameters

  - ```yaml
    min: 0
    max: 42
    ```

- `input` - plain text input

  - does not need any additional parameters