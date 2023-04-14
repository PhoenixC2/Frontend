import SideBar from "./frame/sidebar";
import NavBar from "./frame/navbar";

export default function MainFrame(props) {
  const body = props.body ? props.body : <div>Empty</div>;

  return (
    <div className="wrapper">
      <SideBar />
      <div className="main-panel">
        <NavBar />
        <div className="content">
          <div className="container-fluid">{body}</div>
        </div>
      </div>
    </div>
  );
}
