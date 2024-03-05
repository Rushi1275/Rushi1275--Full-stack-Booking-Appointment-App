const todoForm = document.querySelector("#todoForm");

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phonenumber = document.getElementById("phonenumber").value.trim();

  try {
    const token = localStorage.getItem("token");
    const formData = { name, email, phonenumber };

    // Determine if it's an update or addition based on existence of data-id attribute
    const dataIndex = e.target.getAttribute("data-index");
    if (dataIndex === null) {
      // New booking
      const response = await axios.post(
        "http://localhost:3000/admin/add-booking",
        formData,
        { headers: { Authorization: token } }
      );
       getTodos() // Assuming response contains updated data
    } else {
      // Update booking
      const bookingId = e.target.getAttribute("data-id");
      const response = await axios.put(
        `http://localhost:3000/admin/update/${bookingId}`,
        formData,
        { headers: { Authorization: token } }
      );
      getTodos(); // Assuming response contains updated data
    }
  } catch (error) {
    console.error("Error saving/updating expense:", error);
  }
});

// Fetch bookings when the page loads
window.addEventListener("DOMContentLoaded", () => {
  getTodos();
});

// Fetch bookings from the server
function getTodos() {
  axios.get("http://localhost:3000/admin/add-booking")
    .then((response) => {
      const data = response.data;
      displayData(data);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}

// Display bookings on the page
function displayData(data) {
  const new_task = document.getElementById("new_task");
  new_task.innerHTML = ""; // Clear previous content

  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "10px";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      deleteUser(item._id); // Assuming item has _id property
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      getEditUser(item._id); // Assuming item has _id property
    });

    listItem.textContent = `Name: ${item.name}, Email: ${item.email}, Phonenumber: ${item.phonenumber}`;
    new_task.appendChild(listItem);
    listItem.appendChild(delBtn);
    listItem.appendChild(editBtn);
  });
}

// Delete a booking
async function deleteUser(bookingId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:3000/admin/delete/${bookingId}`,
      { headers: { Authorization: token } }
    );
    console.log(response.data);
    getTodos(); // Refresh the list after deletion
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}

todoForm.removeAttribute("data-index");
todoForm.removeAttribute("data-id");


async function getEditUser(bookingId) {
  try {
    const response = await axios.get(`http://localhost:3000/admin/edit/${bookingId}`);
    const { name, email, phonenumber } = response.data;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phonenumber").value = phonenumber;

    // Set data attributes for the form to indicate it's for update
    todoForm.setAttribute("data-index", bookingId);
    todoForm.setAttribute("data-id", bookingId);
  } catch (error) {
    console.error("Error editing booking:", error);
  }
}












