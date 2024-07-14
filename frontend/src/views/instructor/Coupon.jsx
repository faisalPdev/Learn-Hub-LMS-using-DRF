import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import apiInstance from "../../utils/axios";
import moment from "moment";
import Toast from "../plugin/Toast";

function Coupon() {
  
  const [show, setShow] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (couponItem) => {
    setShow(true);
    setSelectedCoupon(couponItem);
    console.log(selectedCoupon);
  };

  const handleAddCouponClose = () => setShowAddCoupon(false);
  const handleAddCouponShow = () => setShowAddCoupon(true);

  const [coupons, setCoupons] = useState([]);
  const [newcouponCode, setNewCouponCode] = useState({
    couponCode: "",
    discount: 0,
  });

  const handleCouponCodeChange = (e) => {
    setNewCouponCode({
      ...newcouponCode,
      [e.target.name]: e.target.value,
    });
    console.log(newcouponCode);
  };

  const fetchCoupons = async () => {
    try {
      await apiInstance
        .get(`teacher/coupon-list/${UserData()?.teacher_id}/`)
        .then((res) => {
          console.log(res.data);
          setCoupons(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const addCoupon = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("teacher", UserData()?.teacher_id);
    formdata.append("code", newcouponCode.couponCode);
    formdata.append("discount", newcouponCode.discount);
    formdata.append("active", true);

    try {
      await useAxios()
        .post(`teacher/coupon-list/${UserData()?.teacher_id}/`, formdata)
        .then((res) => {
          console.log(res.data);
          setShowAddCoupon(false);
          fetchCoupons();

          Toast().fire({
            icon: "success",
            title: "Coupon added successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCoupon = async (e, couponId) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("teacher", UserData()?.teacher_id);
    formdata.append("code", newcouponCode.couponCode || selectedCoupon?.code);
    formdata.append(
      "discount",
      newcouponCode.discount || selectedCoupon?.discount
    );
    formdata.append("active", true);

    try {
      await useAxios()
        .patch(
          `teacher/coupon-detail/${UserData()?.teacher_id}/${couponId}/`,
          formdata
        )
        .then((res) => {
          console.log(res.data);
          setNewCouponCode({ couponCode: "", discount: 0 });
          setShow(false);
          Toast().fire({
            icon: "success",
            title: "Coupon Updated successfully",
          });
          fetchCoupons();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCoupon = async (couponId) => {
    try {
      await useAxios()
        .delete(`teacher/coupon-detail/${UserData()?.teacher_id}/${couponId}/`)
        .then((res) => {
          console.log(res.data);
          fetchCoupons();
          Toast().fire({
            icon: "success",
            title: "Coupon deleted successfully",
          });
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
                    <h3 className="mb-0">Coupons</h3>
                    <span>Manage all your coupons from here</span>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddCouponShow}
                  >
                    Add Coupon
                  </button>
                </div>
                {/* Card body */}
                {coupons?.map((c, index) => (
                  <div className="card-body">
                    {/* List group */}
                    <ul className="list-group list-group-flush">
                      {/* List group item */}
                      <li className="list-group-item p-4 shadow rounded-3">
                        <div className="d-flex">
                          <div className="ms-3 mt-2">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h4 className="mb-0 text-success">{c.code}</h4>
                                <span>
                                  {c.used_by?.length === 0 && "Not Used"}
                                  {c.used_by?.length === 1 && "1 Student"}
                                  {c.used_by?.length > 1 &&
                                    c.used_by?.length + " Students"}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="mt-2">
                                <span className="me-2 fw-bold">
                                  Discount:{" "}
                                  <span className="fw-light">
                                    {c.discount} % Discount
                                  </span>
                                </span>
                              </p>
                              <p className="mt-1">
                                <span className="me-2 fw-bold">
                                  Date Created:{" "}
                                  <span className="fw-light">
                                    {moment(c.date).format("DD/MM/YYYY")}
                                  </span>
                                </span>
                              </p>
                              <p>
                                <button
                                  class="btn btn-outline-secondary"
                                  type="button"
                                  onClick={() => handleShow(c)}
                                >
                                  Update Coupon
                                </button>

                                <button
                                  class="btn btn-danger ms-2"
                                  type="button"
                                  onClick={() => deleteCoupon(c.id)}
                                >
                                  <i className="fas fa-trash"></i>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update Coupon -{" "}
            <span className="fw-bold">{selectedCoupon?.code}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => updateCoupon(e, selectedCoupon?.id)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Code
              </label>
              <input
                type="text"
                placeholder="Code"
                defaultValue={selectedCoupon?.code}
                className="form-control"
                name="couponCode"
                onChange={handleCouponCodeChange}
                id=""
              />
              <label for="exampleInputEmail1" class="form-label mt-3">
                Discount
              </label>
              <input
                type="text"
                placeholder="Discount"
                defaultValue={selectedCoupon?.discount}
                className="form-control"
                name="discount"
                onChange={handleCouponCodeChange}
                id=""
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Update Coupon <i className="fas fa-check-circle"> </i>
            </button>

            <Button className="ms-2" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddCoupon} onHide={handleAddCouponClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addCoupon}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Code
              </label>
              <input
                type="text"
                placeholder="Code"
                className="form-control"
                name="couponCode"
                onChange={handleCouponCodeChange}
                id=""
              />
              <label for="exampleInputEmail1" class="form-label mt-3">
                Discount
              </label>
              <input
                type="text"
                placeholder="Discount"
                className="form-control"
                name="discount"
                onChange={handleCouponCodeChange}
                id=""
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Create Coupon <i className="fas fa-plus"> </i>
            </button>

            <Button
              className="ms-2"
              variant="secondary"
              onClick={handleAddCouponClose}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <BaseFooter />
    </>
  );
}

export default Coupon;
