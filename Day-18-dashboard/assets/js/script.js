const dashboardData = {
      revenue: 45890,
      orders: 1280,
      users: 932,
      products: 245
    };

    function counter(id, target){

      let count = 0;

      let speed = target / 100;

      let update = setInterval(() => {

        count += speed;

        if(count >= target){
          count = target;
          clearInterval(update);
        }

        document.getElementById(id).innerText =
          Math.floor(count).toLocaleString();

      }, 20);

    }

    counter("revenue", dashboardData.revenue);
    counter("orders", dashboardData.orders);
    counter("users", dashboardData.users);
    counter("products", dashboardData.products);

    const orders = [

      {
        id:"#1021",
        customer:"Rahul Sharma",
        product:"Laptop",
        amount:"₹52,000",
        status:"Completed"
      },

      {
        id:"#1022",
        customer:"Meet Patel",
        product:"iPhone 15",
        amount:"₹89,000",
        status:"Pending"
      },

      {
        id:"#1023",
        customer:"Amit Verma",
        product:"Headphones",
        amount:"₹4,500",
        status:"Cancelled"
      },

      {
        id:"#1024",
        customer:"Priya Shah",
        product:"Smart Watch",
        amount:"₹7,999",
        status:"Completed"
      }

    ];

    const tableBody = document.getElementById("tableBody");

    orders.forEach(order => {

      let badgeClass = "";

      if(order.status === "Completed"){
        badgeClass = "completed";
      }

      else if(order.status === "Pending"){
        badgeClass = "pending";
      }

      else{
        badgeClass = "cancel";
      }

      tableBody.innerHTML += `
      
        <tr>

          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.product}</td>
          <td>${order.amount}</td>

          <td>
            <span class="badge-status ${badgeClass}">
              ${order.status}
            </span>
          </td>

        </tr>

      `;

    });