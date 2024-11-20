import { Link } from "react-router-dom";
import "./menu.scss";

const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "/home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/users",
        icon: "/user.svg",
      },
      {
        id: 2,
        title: "Orders",
        url: "/orders",
        icon: "/order.svg",
      },
      {
        id: 3,
        title: "Tickets",
        url: "/tickets",
        icon: "/post2.svg",
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Notes",
        url: "/",
        icon: "/note.svg",
      },
      {
        id: 2,
        title: "Calendar",
        url: "/",
        icon: "/calendar.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "/setting.svg",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "/chart.svg",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "/log.svg",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Menu;
