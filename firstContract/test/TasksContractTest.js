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
    const result = await this.tasksContract.createTask("Some tasks test", "Description 2")
  })

})