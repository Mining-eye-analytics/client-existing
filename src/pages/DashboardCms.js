import "../styles/dashboard_cms.scss";
import Dashboard from "./Dashboard";
import CmsUser from "./CmsUser";
import CmsCctv from "./CmsCctv";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { ReactComponent as MingcuteGrid2Fill } from "../assets/iconify/mingcute--grid-2-fill.svg";
import { ReactComponent as MdiUsers } from "../assets/iconify/mdi--users.svg";
import { ReactComponent as MdiCctv } from "../assets/iconify/mdi--cctv.svg";
import { ReactComponent as TablerArrowBackUp } from "../assets/iconify/tabler--arrow-back-up.svg";
import { ReactComponent as HeroiconsOutlineLogout } from "../assets/iconify/heroicons-outline--logout.svg";

const data = [
  {
    name: "Senin",
    true: 400,
    false: 240,
  },
  {
    name: "Selasa",
    true: 300,
    false: 139,
  },
  {
    name: "Rabu",
    true: 200,
    false: 380,
  },
  {
    name: "Kamis",
    true: 278,
    false: 390,
  },
  {
    name: "Jumat",
    true: 189,
    false: 480,
  },
  {
    name: "Sabtu",
    true: 239,
    false: 380,
  },
  {
    name: "Minggu",
    true: 349,
    false: 430,
  },
];

const dataCctv = [
  { name: "CCTV A", value: 1400 },
  { name: "CCTV B", value: 3000 },
  { name: "CCTV C", value: 300 },
  { name: "CCTV D", value: 1600 },
  { name: "CCTV E", value: 1200 },
];

const DashboardCms = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");

  return (
    <div className="dashboard-cms">
      <div className="row w-100 m-0">
        <div className="navbar col-2 px-4 py-2 d-flex align-items-start flex-column">
          <div className="d-grid gap-4 mb-auto">
            <div className="d-flex justify-content-center">
              <img
                className="w-100"
                src={require("../assets/logo.webp")}
                alt=""
              />
            </div>
            <div>
              <h6 className="pb-2">Dasbor</h6>
              <button
                className={
                  "border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1 w-100" +
                  (currentTab === "dashboard" ? " active" : "")
                }
                onClick={() => {
                  setCurrentTab("dashboard");
                }}
              >
                <MingcuteGrid2Fill className="icon" />
                <label>Dasbor</label>
              </button>
            </div>
            <div>
              <h6 className="pb-2">Content Management</h6>
              <div className="d-grid gap-3">
                <button
                  className={
                    "border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1 w-100" +
                    (currentTab === "cms-user" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentTab("cms-user");
                  }}
                >
                  <MdiUsers className="icon" />
                  <label>Pengguna</label>
                </button>
                <button
                  className={
                    "border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1 w-100" +
                    (currentTab === "cms-cctv" ? " active" : "")
                  }
                  onClick={() => {
                    setCurrentTab("cms-cctv");
                  }}
                >
                  <MdiCctv className="icon" />
                  <label>CCTV</label>
                </button>
              </div>
            </div>
          </div>
          <div className="exit-nav d-grid gap-2">
            <span
              className="back-nav d-flex align-items-center gap-1 ms-3"
              onClick={() => {
                window.location.href = "/validasi-notifikasi";
              }}
            >
              <TablerArrowBackUp className="icon" />
              <label>Kembali Ke MEA</label>
            </span>
            <span className="logout-nav d-flex align-items-center gap-1 mx-3">
              <HeroiconsOutlineLogout className="icon" />
              <label>Log Out</label>
            </span>
          </div>
        </div>
        <div className="content col px-4 pt-2">
          {currentTab === "dashboard" ? (
            <Dashboard data={data} dataCctv={dataCctv} />
          ) : currentTab === "cms-user" ? (
            <CmsUser />
          ) : (
            <CmsCctv />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCms;
