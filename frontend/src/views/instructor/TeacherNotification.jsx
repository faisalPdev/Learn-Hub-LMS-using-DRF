import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { useState, useEffect } from "react";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import moment from "moment";

function TeacherNotification() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    useAxios()
      .get(`teacher/notifi-list/${UserData()?.teacher_id}/`)
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsSeen = async (notiId) => {
    try {
      useAxios()
        .patch(`teacher/notifi-detail/${UserData()?.teacher_id}/${notiId}/`, {
          seen: true,
        })
        .then((res) => {
          console.log(res.data);
          fetchNotifications();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              {/* Card */}
              <div className="card mb-4">
                {/* Card header */}
                <div className="card-header d-lg-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Notifications</h3>
                    <span>Manage all your notifications from here</span>
                  </div>
                </div>
                {/* Card body */}
                {notifications?.map((n, index) => (
                  <div className="card-body">
                    {/* List group */}
                    <ul className="list-group list-group-flush">
                      {/* List group item */}
                      <li className="list-group-item p-4 shadow rounded-3">
                        <div className="d-flex">
                          <div className="ms-3 mt-2">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h4 className="mb-0">{n.type}</h4>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="mt-1">
                                <span className="me-2 fw-bold">
                                  Date:{" "}
                                  <span className="fw-light">
                                    {moment(n.date).format("DD/MM/YYYY")}
                                  </span>
                                </span>
                              </p>
                              <p>
                                <button
                                  class="btn btn-outline-secondary"
                                  type="button"
                                  onClick={() => handleMarkAsSeen(n.id)}
                                >
                                  Mark as Seen <i className="fas fa-check"></i>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default TeacherNotification;
