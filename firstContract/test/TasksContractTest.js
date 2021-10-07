const TasksContract = artifacts.require("TasksContract");

contract("TasksContractTesting", () => {

  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  })

  it("Migrate deployed successfully", async () => {
    const address = this.tasksContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  })

  it("Get tasks list", async () => {
    const tasksCounter = await this.tasksContract.tasksCounter();
    const task = await this.tasksContract.tasks(tasksCounter - 1);

    assert.equal(task.id.toNumber(), tasksCounter - 1);
    assert.equal(task.title, "First task example");
    assert.equal(task.description, "Gotta do something");
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  })

  it("Task created successfully", async () => {
    const result = await this.tasksContract.createTask("Some tasks test", "Description 2");
    const taskEvent = result.logs[0].args;
    const tasksCounter = await this.tasksContract.tasksCounter();

    assert.equal(tasksCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "Some tasks test");
    assert.equal(taskEvent.description, "Description 2");
    assert.equal(taskEvent.done, false);
  })

  it('task toggle done', async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id, 1);
  })

})