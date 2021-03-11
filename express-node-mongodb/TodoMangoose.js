const todoSchema = new mongoose.Schema({
  content: String,
});

todoSchema.methods.display = function () {
  console.log(` ${this.content} `);
};

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
