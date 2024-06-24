import "../styles/cms.scss";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ReactComponent as MingcuteCheckFill } from "../assets/iconify/mingcute--check-fill.svg";
import { ReactComponent as EpCloseBold } from "../assets/iconify/ep--close-bold.svg";
import { ReactComponent as MaterialSymbolsEdit } from "../assets/iconify/material-symbols--edit.svg";
import { ReactComponent as MingcuteDeleteFill } from "../assets/iconify/mingcute--delete-fill.svg";
import { ReactComponent as EntypoExport } from "../assets/iconify/entypo--export.svg";
import { ReactComponent as ClarityServerSolid } from "../assets/iconify/clarity--server-solid.svg";
import { ReactComponent as AkarIconsClock } from "../assets/iconify/akar-icons--clock.svg";

const CmsUser = () => {
  const [action, setAction] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [formMessage, setFormMessage] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 2,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 3,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 4,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 5,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 6,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 7,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 8,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 9,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
    {
      id: 10,
      name: "Developer",
      username: "developer",
      role: "Admin",
      company: "PT. Berau Coal",
    },
  ]);

  const [addDataForm, setAddDataForm] = useState({
    id: data.length !== 0 ? data[data.length - 1]?.id + 1 : 1,
    name: "",
    username: "",
    role: "",
    company: "",
  });

  const [editDataForm, setEditDataForm] = useState({});

  useEffect(() => {
    setAddDataForm({
      id: data.length !== 0 ? data[data.length - 1]?.id + 1 : 1,
      name: "",
      username: "",
      role: "",
      company: "",
    });

    setEditDataForm({});
  }, [data]);

  const addUser = (addForm) => {
    if (addForm.name !== "" && addForm.username !== "" && addForm.role !== "") {
      setData((array) => [...array, addForm]);
      setFormMessage("");
    } else {
      setFormMessage("*form tidak boleh kosong");
    }
  };

  const editUser = (editForm, index) => {
    const temporaryData = data;
    temporaryData[index] = editForm;
    setData(temporaryData);
    setFormMessage("");
  };

  const deleteUser = (userId) => {
    setData(data.filter((user) => user.id !== userId));
  };

  const userArr = data.map((user, index) => {
    return (
      <tr className="align-middle">
        <th className="text-center" scope="row">
          {user.id}
        </th>
        <td className="text-center">
          <input
            className="form-control w-100"
            type="text"
            value={editDataForm.id !== user.id ? user.name : editDataForm.name}
            placeholder="Masukkan nama"
            disabled={currentUser === user.id ? false : true}
            onChange={(e) => {
              setEditDataForm({ ...editDataForm, name: e.target.value });
            }}
          />
        </td>
        <td className="text-center">
          <input
            className="form-control w-100"
            type="text"
            value={
              editDataForm.id !== user.id
                ? user.username
                : editDataForm.username
            }
            placeholder="Masukkan username"
            disabled={currentUser === user.id ? false : true}
            onChange={(e) => {
              setEditDataForm({ ...editDataForm, username: e.target.value });
            }}
          />
        </td>
        <td className="text-center">
          <input
            className="form-control w-100"
            type="text"
            value={editDataForm.id !== user.id ? user.role : editDataForm.role}
            placeholder="Masukkan role"
            disabled={currentUser === user.id ? false : true}
            onChange={(e) => {
              setEditDataForm({ ...editDataForm, role: e.target.value });
            }}
          />
        </td>
        <td className="text-center">
          <input
            className="form-control w-100"
            type="text"
            value={
              editDataForm.id !== user.id ? user.company : editDataForm.company
            }
            placeholder="Masukkan instansi"
            disabled={currentUser === user.id ? false : true}
            onChange={(e) => {
              setEditDataForm({ ...editDataForm, company: e.target.value });
            }}
          />
        </td>
        {currentUser === user.id ? (
          <td className="text-center">
            <button
              className="border-0 me-2"
              onClick={() => {
                action === "edit"
                  ? editUser(editDataForm, index)
                  : deleteUser(user.id);
                setCurrentUser();
                setAction();
              }}
            >
              <MingcuteCheckFill className="icon icon-green" />
            </button>
            <button
              className="border-0"
              onClick={() => {
                formMessage === ""
                  ? setFormMessage(formMessage)
                  : setFormMessage("");
                setCurrentUser();
                setAction();
                setEditDataForm({});
              }}
            >
              <EpCloseBold className="icon icon-red" />
            </button>
          </td>
        ) : (
          <td className="text-center">
            <button
              className="border-0 me-2"
              onClick={() => {
                setCurrentUser(user.id);
                setAction("edit");
                setEditDataForm(user);
              }}
            >
              <MaterialSymbolsEdit className="icon icon-green" />
            </button>
            <button
              className="border-0"
              onClick={() => {
                setCurrentUser(user.id);
                setAction("delete");
              }}
            >
              <MingcuteDeleteFill className="icon icon-red" />
            </button>
          </td>
        )}
      </tr>
    );
  });

  return (
    <div className="dashboard d-flex flex-column gap-3">
      <div className="row m-0">
        <div className="col p-0">
          <h1>CMS - Pengguna</h1>
        </div>
        <div className="col p-0 d-flex justify-content-end">
          <button className="border-0 rounded-2 px-3 py-2 d-flex align-items-center gap-1">
            <EntypoExport className="icon" />
            <label>Export</label>
          </button>
        </div>
      </div>
      <div className="d-grid gap-3 overflow-auto pb-2">
        <div className="row m-0 gap-3 align-items-end">
          <div className="col-3 p-0">
            <div className="info rounded-2 d-grid gap-3 px-3 py-2">
              <label className="info-title">
                Total pengguna pada <br /> BMO 2 Blok 8
              </label>
              <div className="info-content d-flex justify-content-center align-items-end gap-1">
                <label>{data.length}</label>
                <label>pengguna</label>
              </div>
              <div className="info-other d-flex justify-content-end align-items-center gap-1">
                <ClarityServerSolid className="icon" />
                <label>10.10.10.66</label>
              </div>
            </div>
          </div>
          <div className="col-3 p-0">
            <div className="info rounded-2 d-grid gap-3 px-3 py-2">
              <label className="info-title">Jumlah pengguna yang online</label>
              <div className="info-content d-flex justify-content-center align-items-end gap-1">
                <label>3</label>
                <label>pengguna</label>
              </div>
              <div className="info-other d-flex justify-content-end align-items-center gap-1">
                <AkarIconsClock className="icon" />
                <label>01.23 WITA</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row m-0 mb-2">
            <div className="col p-0">
              <label>Daftar Pengguna</label>
            </div>
            <div className="col p-0 d-flex justify-content-end">
              <label>{formMessage}</label>
            </div>
          </div>
          <div className="cms-table overflow-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th className="table-header" scope="col">
                    ID
                  </th>
                  <th className="table-header" scope="col">
                    Nama Pengguna
                  </th>
                  <th className="table-header" scope="col">
                    Username
                  </th>
                  <th className="table-header" scope="col">
                    Role
                  </th>
                  <th className="table-header" scope="col">
                    Instansi
                  </th>
                  <th className="table-header" scope="col">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr className="align-middle">
                  <th className="text-center" scope="row">
                    *
                  </th>
                  <td className="text-center">
                    <input
                      className="form-control w-100"
                      type="text"
                      value={addDataForm.name}
                      placeholder="Masukkan nama"
                      disabled={!currentUser ? false : true}
                      onChange={(e) => {
                        setAddDataForm({
                          ...addDataForm,
                          name: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      className="form-control w-100"
                      type="text"
                      value={addDataForm.username}
                      placeholder="Masukkan username"
                      disabled={!currentUser ? false : true}
                      onChange={(e) => {
                        setAddDataForm({
                          ...addDataForm,
                          username: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      className="form-control w-100"
                      type="text"
                      value={addDataForm.role}
                      placeholder="Masukkan role"
                      disabled={!currentUser ? false : true}
                      onChange={(e) => {
                        setAddDataForm({
                          ...addDataForm,
                          role: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      className="form-control w-100"
                      type="text"
                      value={addDataForm.company}
                      placeholder="Masukkan instansi"
                      disabled={!currentUser ? false : true}
                      onChange={(e) => {
                        setAddDataForm({
                          ...addDataForm,
                          company: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <button
                      className="border-0"
                      onClick={() => {
                        addUser(addDataForm);
                      }}
                    >
                      Tambah Data
                    </button>
                  </td>
                </tr>
                {userArr}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsUser;
