export const createUser = (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuidv4() });
    res.send(`user with the name ${user.firstName} added to the database.`);    // Now sends the array to the browser
}