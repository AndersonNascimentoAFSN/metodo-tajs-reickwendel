import uuid from 'node:uuid';

export class Todo {
  constructor({ text, when }) {
    this.text = text
    this.when = when

    this.status = ''
    this.id = uuid.v4()
  }

  isValid() {
    return null
  }
}
