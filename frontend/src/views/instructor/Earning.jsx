import React, { useEffect } from "react";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import { useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function Earning() {
  const [stats, setStats] = useState([]);
  const [bestSellingCourse, setBestSellingCourse] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    useAxios()
      .get(`teacher/summary/${UserData()?.teacher_id}/`)
      .then((res) => {
        console.log(res.data);
        setStats(res.data[0]);
      });

    useAxios()
      .get(`teacher/best-selling-course-list/${UserData()?.teacher_id}/`)
      .then((res) => {
        console.log(res.data);
        setBestSellingCourse(res.data);
      });

    useAxios()
      .get(`teacher/monthly-earning/${UserData()?.teacher_id}/`)
      .then((res) => {
        console.log(res.data);
        setMonthlyRevenue(res.data);
      });
  }, []);

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
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="mb-0">Earnings</h3>
                  <p className="mb-0">
                    You have full control to manage your own account setting.
                  </p>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Earnings</h4>
                  <div className="dropdown dropstart">
                    <a
                      className="btn-icon btn btn-ghost btn-sm rounded-circle"
                      href="#"
                      role="button"
                      id="paymentDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical" />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="paymentDropdown"
                    >
                      <span className="dropdown-header">Setting</span>
                      <a className="dropdown-item" href="#">
                        30 Days
                      </a>
                      <a className="dropdown-item" href="#">
                        2 Months
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3 mb-lg-0">
                      <div className="border p-3 rounded shadow-sm">
                        <i className="fe fe-shopping-cart icon-shape icon-sm rounded-3 bg-light-success text-dark-success mt-2" />
                        <h3 className="display-4 fw-bold mt-3 mb-0">
                          ₹ {stats.monthly_revenue}
                        </h3>
                        <span>Monthly Earnings (Jan)</span>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3 mb-lg-0">
                      <div className="border p-3 rounded shadow-sm">
                        <i className="fe fe-shopping-cart icon-shape icon-sm rounded-3 bg-light-success text-dark-success mt-2" />
                        <h3 className="display-4 fw-bold mt-3 mb-0">
                          ₹ {stats.total_revenue}
                        </h3>
                        <span>Your Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card */}
              <div className="card mb-4">
                <div className="card-header border-bottom-0">
                  <h3 className="mb-0 h4">Best Selling Courses</h3>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Courses</th>
                        <th>Sales</th>
                        <th>Amount</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {bestSellingCourse?.map((b, index) => (
                        <tr>
                          <td>
                            <a
                              href="#"
                              className="text-decoration-none text-dark"
                            >
                              <div className="d-flex align-items-center">
                                <img
                                  src={`http://127.0.0.1:8000${b.course_image}`}
                                  alt="course"
                                  style={{
                                    width: "100px",
                                    height: "70px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  className="rounded img-4by3-lg"
                                />
                                <h5 className="mb-0 ms-3 ">{b.course_title}</h5>
                              </div>
                            </a>
                          </td>
                          <td>{b.total_sales}</td>
                          <td>₹ {b.revenue}</td>
                          <td className="align-middle border-top-0">
                            <span className="dropdown dropstart">
                              <a
                                className="btn-icon btn btn-ghost btn-sm rounded-circle"
                                href="#"
                                role="button"
                                id="courseDropdown1"
                                data-bs-toggle="dropdown"
                                data-bs-offset="-20,20"
                                aria-expanded="false"
                              >
                                <i className="fe fe-more-vertical" />
                              </a>
                              <span
                                className="dropdown-menu"
                                aria-labelledby="courseDropdown1"
                              >
                                <span className="dropdown-header">Setting</span>
                                <a className="dropdown-item" href="#">
                                  <i className="fe fe-edit dropdown-item-icon" />
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fe fe-trash dropdown-item-icon" />
                                  Remove
                                </a>
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card mb-4">
                {/* Card header */}
                <div className="card-header border-bottom-0">
                  <h3 className="h4 mb-3">Earning History</h3>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Month</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyRevenue?.map((m, index) => (
                        <tr>
                          <td>
                            {m.month === 1 && "January"}
                            {m.month === 2 && "February"}
                            {m.month === 3 && "March"}
                            {m.month === 4 && "April"}
                            {m.month === 5 && "May"}
                            {m.month === 6 && "June"}
                            {m.month === 7 && "July"}
                            {m.month === 8 && "August"}
                            {m.month === 9 && "September"}
                            {m.month === 10 && "October"}
                            {m.month === 11 && "November"}
                            {m.month === 12 && "December"}
                          </td>
                          <td>₹ {m.total_earning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Earning;
