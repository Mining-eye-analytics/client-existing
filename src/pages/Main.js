// importing style
import "../styles/main.scss";

// importing components
import Cctv from "../components/Cctv";
import Notification from "../components/Notification";

//importing pages
import LiveMonitoring from "./LiveMonitoring";
import ValidasiNotifikasi from "./ValidasiNotifikasi";
import DatabaseDeviasi from "./DatabaseDeviasi";

// importing libraries
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

// importing redux actions
import { setMode, setPage } from "../redux/generalSlice";
import { getCctvList, addDeviationIndicatedCctv } from "../redux/cctvSlice";
import {
  getNotificationList,
  addSocketNotification,
  setNotificationLimit,
  reloadNotification,
  addNotificationChild,
} from "../redux/notificationSlice";
import {
  getDeviationList,
  setCurrentDeviation,
  setDeviationCurrentDate,
  setTablePageDataLimit,
  setCurrentTablePage,
} from "../redux/deviationSlice";
import { ReactComponent as PhSunFill } from "../assets/iconify/ph--sun-fill.svg";
import { ReactComponent as PhMoonFill } from "../assets/iconify/ph--moon-fill.svg";
import { ReactComponent as BiPersonCircle } from "../assets/iconify/bi--person-circle.svg";
import { ReactComponent as MingcuteGrid2Fill } from "../assets/iconify/mingcute--grid-2-fill.svg";
import { ReactComponent as HeroiconsOutlineLogout } from "../assets/iconify/heroicons-outline--logout.svg";

const Main = () => {
  // defining state variabels with redux
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.general.mode);
  const page = useSelector((state) => state.general.page);

  const notificationCurrentCctv = useSelector(
    (state) => state.notification.currentCctv
  );
  const currentObject = useSelector((state) => state.object.current);
  const currentValidationStatus = useSelector(
    (state) => state.validationStatus.current
  );
  const notificationLimit = useSelector((state) => state.notification.limit);
  const submit = useSelector((state) => state.notification.submit);
  const reload = useSelector((state) => state.notification.reload);
  const alarmSound = useSelector((state) => state.notification.alarmSound);
  const deviationIndicatedCctv = useSelector(
    (state) => state.cctv.deviationIndicatedCctv
  );
  const audio = new Audio(require("../assets/notification.mp3"));

  const deviationCurrentCctv = useSelector(
    (state) => state.deviation.currentCctv
  );
  const deviationCurrentObject = useSelector(
    (state) => state.deviation.currentObject
  );
  const deviationCurrentValidationStatus = useSelector(
    (state) => state.deviation.currentValidationStatus
  );
  const deviationCurrentDate = useSelector(
    (state) => state.deviation.currentDate
  );
  const deviationCurrentTime = useSelector(
    (state) => state.deviation.currentTime
  );

  // defining state variabels with react hooks
  const [date, setDate] = useState([new Date(), new Date()]);

  // react hooks to trigger getCctvList function running once in initial rendering
  useEffect(() => {
    dispatch(getCctvList());
  }, []);

  // react hooks to trigger getNotificationList function running once in initial rendering and every time the value of notificationCurrentCctv, currentObject, currentValidationStatus, submit, reload, and notificationLimit changes
  useEffect(() => {
    dispatch(getNotificationList());
  }, [
    notificationCurrentCctv,
    currentObject,
    currentValidationStatus,
    submit,
    reload === true ? notificationLimit : notificationCurrentCctv,
  ]);

  // socket.io variable to connect client to server
  const socket = socketIOClient(
    window.location.protocol +
      "//" +
      (window.location.hostname === "localhost"
        ? "10.1.74.9"
        : window.location.hostname) +
      ":" +
      process.env.REACT_APP_API_PORT,
    {
      transports: ["polling"],
      cors: {
        origin: "*",
      },
    }
  );

  // react hooks to connect client to server with socket.io and change notification state variabels every time the value of notificationCurrentCctv, currentObject, currentValidationStatus, reload, and notificationLimit changes
  useEffect(() => {
    socket.on("message_from_server", (data) => newNotifHandler(data));
    if (socket.connected === false) {
      console.log(socket);
    }

    return () => {
      socket.off("message_from_server");
    };
  }, [
    notificationCurrentCctv,
    currentObject,
    currentValidationStatus,
    reload,
    notificationLimit,
    alarmSound,
    deviationIndicatedCctv,
  ]);

  // function to handle new notification traffic from socket.io
  const newNotifHandler = (newNotif) => {
    console.log(newNotif.filter((notif) => notif.parent_id === null).length);

    newNotif.map((notification) => {
      if (
        currentValidationStatus === "All" ||
        currentValidationStatus === "Butuh Validasi"
      ) {
        if (notification.parent_id === null) {
          if (notificationCurrentCctv !== 0) {
            if (notificationCurrentCctv.toString() === notification.cctv_id) {
              if (currentObject === "All") {
                dispatch(addSocketNotification(notification));
                dispatch(reloadNotification(false));
                dispatch(setNotificationLimit(notificationLimit + 1));
                console.log({ notification, notificationLimit });
                if (alarmSound === true) {
                  audio.play();
                }
              } else {
                if (currentObject === notification.type_object) {
                  dispatch(addSocketNotification(notification));
                  dispatch(reloadNotification(false));
                  dispatch(setNotificationLimit(notificationLimit + 1));
                  console.log({ notification, notificationLimit });
                  if (alarmSound === true) {
                    audio.play();
                  }
                }
              }
            } else {
              if (!deviationIndicatedCctv.includes(notification.cctv_id)) {
                dispatch(addDeviationIndicatedCctv(notification.cctv_id));
              }
            }
          } else {
            if (currentObject === "All") {
              dispatch(addSocketNotification(notification));
              dispatch(reloadNotification(false));
              dispatch(setNotificationLimit(notificationLimit + 1));
              console.log({ notification, notificationLimit });
              if (alarmSound === true) {
                audio.play();
              }
            } else {
              if (currentObject === notification.type_object) {
                dispatch(addSocketNotification(notification));
                dispatch(reloadNotification(false));
                dispatch(setNotificationLimit(notificationLimit + 1));
                console.log({ notification, notificationLimit });
                if (alarmSound === true) {
                  audio.play();
                }
              }
            }
            if (!deviationIndicatedCctv.includes(notification.cctv_id)) {
              dispatch(addDeviationIndicatedCctv(notification.cctv_id));
            }
          }
        } else {
          if (notificationCurrentCctv !== 0) {
            if (notificationCurrentCctv.toString() === notification.cctv_id) {
              if (currentObject === "All") {
                dispatch(addNotificationChild(notification));
              } else {
                if (currentObject === notification.type_object) {
                  dispatch(addNotificationChild(notification));
                }
              }
            }
          } else {
            if (currentObject === "All") {
              dispatch(addNotificationChild(notification));
            } else {
              if (currentObject === notification.type_object) {
                dispatch(addNotificationChild(notification));
              }
            }
          }
        }
      }
    });
  };

  // react hooks to trigger getDeviationList function running once in initial rendering and every time the value of deviationCurrentCctv, deviationCurrentObject, deviationCurrentValidationStatus, deviationCurrentDate, and deviationCurrentTime changes
  useEffect(() => {
    dispatch(getDeviationList());
  }, [
    deviationCurrentCctv,
    deviationCurrentObject,
    deviationCurrentValidationStatus,
    deviationCurrentDate,
    deviationCurrentTime,
    submit,
  ]);

  // react hooks to set deviationCurrentDate value to the selected date every time the value of date changes
  useEffect(() => {
    dispatch(setDeviationCurrentDate(date));
  }, [date]);

  // react hooks to set tablePageDataLimit value back to 25, set currentTablePage value back to 1, and set currentDeviation value back to undefined (empty) every time the value of deviationCurrentCctv, deviationCurrentObject, deviationCurrentValidationStatus, deviationCurrentDate, and deviationCurrentTime changes
  useEffect(() => {
    dispatch(setTablePageDataLimit(25));
    dispatch(setCurrentTablePage(1));
    dispatch(setCurrentDeviation());
  }, [
    deviationCurrentCctv,
    deviationCurrentObject,
    deviationCurrentValidationStatus,
    deviationCurrentDate,
    deviationCurrentTime,
  ]);

  // rendering UI by returning html elements
  return (
    <div className={"main" + (mode === "light" ? " main-light" : " main-dark")}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container">
          <div
            className="navbar-brand d-flex align-items-center"
            onClick={() => {
              dispatch(setPage("validasi-notifikasi"));
              window.history.replaceState(null, null, "/validasi-notifikasi");
            }}
          >
            <img
              src={require("../assets/logo" +
                (mode === "light" ? "" : "-dark") +
                ".webp")}
              alt="logo"
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            data-bs-theme={mode}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
              <li className="nav-item d-flex justify-content-center align-items-center">
                <div
                  className={
                    "nav-link" +
                    (page === "validasi-notifikasi" ? " active" : "")
                  }
                  onClick={() => {
                    dispatch(setPage("validasi-notifikasi"));
                    window.history.replaceState(
                      null,
                      null,
                      "/validasi-notifikasi"
                    );
                  }}
                >
                  Validasi Notifikasi
                </div>
              </li>
              <li className="nav-item d-flex justify-content-center align-items-center">
                <div
                  className={
                    "nav-link" + (page === "database-deviasi" ? " active" : "")
                  }
                  onClick={() => {
                    dispatch(setPage("database-deviasi"));
                    window.history.replaceState(
                      null,
                      null,
                      "/database-deviasi"
                    );
                  }}
                >
                  Database Deviasi
                </div>
              </li>
              <li className="nav-item d-flex justify-content-center align-items-center">
                <div
                  className={
                    "nav-link" + (page === "live-monitoring" ? " active" : "")
                  }
                  onClick={() => {
                    dispatch(setPage("live-monitoring"));
                    window.history.replaceState(null, null, "/live-monitoring");
                  }}
                >
                  Live Monitoring
                </div>
              </li>
              <li className="nav-item d-flex justify-content-center align-items-center">
                <div className="nav-link">
                  <button
                    className="border-0 rounded-5 row align-items-center m-0 p-0"
                    title="mode terang/gelap"
                    onClick={() => {
                      dispatch(setMode(mode === "light" ? "dark" : "light"));
                    }}
                  >
                    {mode === "light" ? (
                      <span className="col rounded-5 d-flex p-0"></span>
                    ) : (
                      ""
                    )}
                    {mode === "light" ? (
                      <PhSunFill className="col d-flex p-0" />
                    ) : (
                      <PhMoonFill className="col d-flex p-0" />
                    )}
                    {mode === "dark" ? (
                      <span className="col d-flex p-0 rounded-5"></span>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </li>
              <li className="nav-item d-grid justify-content-center align-items-center dropdown">
                <button
                  className="nav-link dropdown-toggle border-0 bg-transparent px-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BiPersonCircle className="icon" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end mt-2">
                  <li>
                    <label
                      className="dropdown-item disabled text-center"
                      href="#"
                    >
                      {localStorage.getItem("name")}
                    </label>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {/* <li
                    className={
                      localStorage.getItem("role") === "super_admin"
                        ? ""
                        : "d-none"
                    }
                  >
                    <button
                      className="dashboard dropdown-item d-flex align-items-center gap-2"
                      onClick={() => {
                        window.location.href = "/dashboard";
                      }}
                    >
                      <MingcuteGrid2Fill className="fs-5" />
                      <label>Dashboard</label>
                    </button>
                  </li> */}
                  <li>
                    <button
                      className="log-out dropdown-item d-flex align-items-center gap-2"
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                        window.location.reload();
                      }}
                    >
                      <HeroiconsOutlineLogout className="fs-5" />
                      <label>Log Out</label>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <div className={page !== "database-deviasi" ? "row" : ""}>
          <div className="col-xl-3 mb-xl-0 mb-5">
            {page === "live-monitoring" || page === "validasi-notifikasi" ? (
              <Cctv />
            ) : (
              ""
            )}
          </div>
          <div
            className={
              "col-xl mb-xl-0" + (page !== "database-deviasi" ? " mb-5" : "")
            }
          >
            {page === "live-monitoring" ? (
              <LiveMonitoring />
            ) : page === "validasi-notifikasi" ? (
              <ValidasiNotifikasi />
            ) : (
              <DatabaseDeviasi setDate={setDate} />
            )}
          </div>
          <div className="col-xl-3">
            {page === "live-monitoring" || page === "validasi-notifikasi" ? (
              <Notification />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
