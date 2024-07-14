import React, { useState,useEffect,useRef } from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import { useParams } from 'react-router-dom'
import useAxios from '../../utils/useAxios'
import UserData from '../plugin/UserData'
import ReactPlayer from 'react-player'
import Toast from '../plugin/Toast'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";


function CourseDetail() {

 

  const[course,setCourse]=useState([]);
  const[variantItem,setVariantItem]=useState(null);
  const[completionPercentage,setCompletionPercentage]=useState(0);
  const[markAsCompletedStatus,setMarkAsCompletedStatus]= useState({});
  const[createNote,setCreateNote]=useState({
    "title":"",
    "note":""
  })

  const[selectedNote,setSelectedNote]=useState(null);
  const[createMessage,setCreateMessage]=useState({
    "title":"",
    "message":""
  });
  const[questions,setQuestions]=useState([]);
  const[selectedQuestion,setSelectedQuestion]=useState(null);
  const[createReview,setCreateReview]=useState({
    "rating":1,
    "review":""
  })
  const[studentReview,setStudentReview]=useState([]);





  const param=useParams();
  const lastElementRef=useRef();



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (variant_item) => {
     setShow(true); 
     setVariantItem(variant_item);
    }

  const [noteShow, setNoteShow] = useState(false);
  const handleNoteClose = () => setNoteShow(false);
  const handleNoteShow = (note) => {
     setNoteShow(true);
     setSelectedNote(note);

  }

  const [ConversationShow, setConversationShow] = useState(false);
  const handleConversationClose = () => setConversationShow(false);
  const handleConversationShow = (question) => { 
    setConversationShow(true); 
    setSelectedQuestion(question);

  }

  const[addQuestionShow,setAddQuestionShow]=useState(false);
  const handleQuestionClose =()=> setAddQuestionShow(false);
  const handleQuestionShow =()=>{
    setAddQuestionShow(true)
  }


  

  const fetchCourseDetail =async ()=>{
    try {
      
      await useAxios().get(`/student/course-Detail/${UserData()?.user_id}/${param.enrollment_id}`).then((res)=>{
        console.log(res.data)
        setCourse(res.data)
        setQuestions(res.data.question_answer)
        setStudentReview(res.data.review)
        const percentageCompleted=((res.data.completed_lesson?.length / res.data.lectures?.length) * 100);
        setCompletionPercentage(percentageCompleted?.toFixed(0));
      })

    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    fetchCourseDetail();
  }, []);
  
  const handleMarkLessonAsCompleted = (variantItemId)=>{
    // key= `lecture_${variantItemId}`;
    setMarkAsCompletedStatus({
     ...markAsCompletedStatus,
    //  [key]:"Updating",
    });

    const formdata =new FormData()
    
    formdata.append("user_id",UserData()?.user_id);
    formdata.append("course_id",course.course?.course_id);
    formdata.append("variant_item_id",variantItemId);

    useAxios().post(`/student/course-completed-lesson/`,formdata).then((res)=>{
      console.log(res.data)
      fetchCourseDetail();
      setMarkAsCompletedStatus({
       ...markAsCompletedStatus,
        // [key]:"Updated"
      });
    });
    
  };

  const handleNoteChange =(e)=>{
    setCreateNote({
      ...createNote,
      [e.target.name]:e.target.value
    });
  };
  console.log(createNote)


  const handleNoteCreateSubmit =async (e)=>{
    e.preventDefault();
    const formdata=new FormData();

    formdata.append("user_id",UserData()?.user_id)
    formdata.append("enrollment_id",param.enrollment_id)
    formdata.append("title",createNote.title)
    formdata.append("note",createNote.note)

    try {
      await useAxios().post(`/student/course-note/${UserData()?.user_id}/${param.enrollment_id}/`,formdata).then((res)=>{
        console.log(res.data)
        fetchCourseDetail();
        handleNoteClose();
        Toast().fire({
          icon: "success",
          title: "Note Created Successfully",
        });

      });
    } catch (error) {
      console.log(error);
    }

  };



  const handleNoteEditSubmit = async (e,noteId)=>{
    e.preventDefault();
    const formdata=new FormData();

    formdata.append("user_id",UserData()?.user_id);
    formdata.append("enrollment_id",param.enrollment_id);
    formdata.append("title",createNote.title || selectedNote?.title);
    formdata.append("note",createNote.note || selectedNote?.note);

    try {
      
      await useAxios().patch(`/student/course-note-detail/${UserData()?.user_id}/${param.enrollment_id}/${noteId}`,formdata).then((res)=>{
        console.log(res.data);
        fetchCourseDetail();
        handleNoteClose();
        Toast().fire({
          icon:"success",
          title: "Note Updated Successfully",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleNoteDelete = async (noteId)=>{
    try {
      await useAxios().delete(`/student/course-note-detail/${UserData()?.user_id}/${param.enrollment_id}/${noteId}`).then((res)=>{
        console.log(res.data);
        fetchCourseDetail();
        Toast().fire({
          icon:"success",
          title: "Note Deleted Successfully",
        });
      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleQuestionChange =(e)=>{
    setCreateMessage({
      ...createMessage,
      [e.target.name]:e.target.value
    })
  }
  
  const handleAskQuestionSubmit =async (e)=>{
    e.preventDefault();
    const formdata=new FormData();

    formdata.append("user_id",UserData()?.user_id);
    formdata.append("course_id",course?.course?.course_id);
    formdata.append("title",createMessage.title);
    formdata.append("message",createMessage.message);

    try {
      await useAxios().post(`/student/question-answer-list-create/${course?.course?.course_id}/`,formdata).then((res)=>{
        console.log(res.data);
        handleQuestionClose();
        Toast().fire({
          icon:"success",
          title: "Question is Posted",
        });
      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleQuestionMessageSubmit=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();

    formdata.append("user_id",UserData()?.user_id);
    formdata.append("course_id",course?.course?.course_id);
    formdata.append("qa_id",selectedQuestion?.qa_id);
    formdata.append("message",createMessage.message);

    try {
      await useAxios().post(`/student/question-answer-message-send/` ,formdata).then((res)=>{
        console.log(res.data);

        setSelectedQuestion(res.data.question);
      })
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if(lastElementRef.current){
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedQuestion])


  
  const handleSearchQuestion =(e)=>{
   const query=e.target.value.toLowerCase();
   
   if (query === ""){
    fetchCourseDetail();
   }else{
    const filtered =questions.filter((q)=>{
      return q.title.toLowerCase().includes(query);
    });
    setQuestions(filtered);
   }
  };

  const handleCreateReviewChange=(e)=>{
      setCreateReview({
        ...createReview,
        [e.target.name]:e.target.value
      });
      console.log(createReview)
  };

  const handleCreateReviewSubmit =async (e)=>{
    e.preventDefault();
    const formdata=new FormData();

    formdata.append("user_id",UserData()?.user_id);
    formdata.append("course_id",course?.course?.id);
    formdata.append("rating",createReview.rating);
    formdata.append("review",createReview.review);

    try {
      
      await useAxios().post(`/student/course-review-create/`,formdata).then((res)=>{
        console.log(res.data);
        Toast().fire({
          "icon":'success',
          "title": "Review Posted Successfully",
        })
      })

    } catch (error) {
      console.log(error)
    }
  };


  const handleReviewUpdateSubmit =async (e)=>{
    e.preventDefault();
    const formdata=new FormData();

    formdata.append("user_id",UserData()?.user_id);
    formdata.append("course_id",course?.course?.id);
    formdata.append("rating",createReview.rating || studentReview?.rating);
    formdata.append("review",createReview.review || studentReview?.review);

    try {
      
      await useAxios().patch(`/student/course-review-detail/${UserData()?.user_id}/${studentReview?.review_id}/`,formdata).then((res)=>{
        console.log(res.data);
        Toast().fire({
          "icon":'success',
          "title": "Review Updated Successfully",
        })
      })

    } catch (error) {
      console.log(error)
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
              {/* <section className="bg-blue py-7">
                <div className="container">
                  <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' width={"100%"} height={600} />
                </div>
              </section> */}
              <section className="mt-4">
                <div className="container">
                  <div className="row">
                    {/* Main content START */}
                    <div className="col-12">
                      <div className="card shadow rounded-2 p-0 mt-n5">
                        {/* Tabs START */}
                        <div className="card-header border-bottom px-4 pt-3 pb-0">
                          <ul
                            className="nav nav-bottom-line py-0"
                            id="course-pills-tab"
                            role="tablist"
                          >
                            {/* Tab item */}
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button className="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">
                                Course Lectures
                              </button>
                            </li>
                            {/* Tab item */}
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button
                                className="nav-link mb-2 mb-md-0"
                                id="course-pills-tab-2"
                                data-bs-toggle="pill"
                                data-bs-target="#course-pills-2"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-2"
                                aria-selected="false"
                              >
                                Notes
                              </button>
                            </li>
                            {/* Tab item */}
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button
                                className="nav-link mb-2 mb-md-0"
                                id="course-pills-tab-3"
                                data-bs-toggle="pill"
                                data-bs-target="#course-pills-3"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-3"
                                aria-selected="false"
                              >
                                Discussion
                              </button>
                            </li>

                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button
                                className="nav-link mb-2 mb-md-0"
                                id="course-pills-tab-4"
                                data-bs-toggle="pill"
                                data-bs-target="#course-pills-4"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-4"
                                aria-selected="false"
                              >
                                Leave a Review
                              </button>
                            </li>
                          </ul>
                        </div>
                        {/* Tabs END */}
                        {/* Tab contents START */}
                        <div className="card-body p-sm-4">
                          <div className="tab-content" id="course-pills-tabContent">
                            {/* Content START */}
                            <div
                              className="tab-pane fade show active"
                              id="course-pills-1"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-1"
                            >
                              {/* Accordion START */}
                              <div
                                className="accordion accordion-icon accordion-border"
                                id="accordionExample2"
                              >

                                <div className="progress mb-3">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${completionPercentage}%` }}
                                    aria-valuenow={completionPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    {completionPercentage}%
                                  </div>
                                </div>
                                {/* Item */}
                                {course?.curriculum?.map((c,index)=>(

                                
                                <div className="accordion-item mb-3">
                                  <h6 className="accordion-header font-base" id="heading-1">
                                    <button
                                      className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#collapse-${c.variant_id}`}
                                      aria-expanded="true"
                                      aria-controls={`#collapse-${c.variant_id}`}
                                    >
                                      {c.title}
                                      <span className="small ms-0 ms-sm-2">
                                        ({c.variant_items?.length} Lecture
                                        {c.variant_items?.length > 1 && "s" })
                                      </span>
                                    </button>
                                  </h6>
                                  <div
                                    id={`collapse-${c.variant_id}`}
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="heading-1"
                                    data-bs-parent="#accordionExample2"
                                  >
                                    <div className="accordion-body mt-3">
                                      {/* Course lecture */}
                                    {c.variant_items?.map((l,index)=>(

                                      <>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="position-relative d-flex align-items-center">
                                          <button
                                            onClick={()=> handleShow(l)}
                                            className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                                          >
                                            <i className="fas fa-play me-0" />
                                          </button>
                                          <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                            {l.title}
                                          </span>
                                        </div>
                                        <div className='d-flex'>
                                          <p className="mb-0">
                                            {l.current_duration || 
                                            "0m 0s"}
                                          </p>
                                          <input
                                           type="checkbox"
                                           className='form-check-input ms-2'
                                           name="" 
                                           id=""
                                           onChange={()=> handleMarkLessonAsCompleted(l.variant_item_id)}
                                           checked={course.completed_lesson?.some(
                                            (cl) =>
                                              cl.variant_item.id ===
                                              l.id
                                          )} />
                                        </div>
                                      </div>
                                      <hr /> {/* Divider */}
                                      </>
                                    ))}
                                    </div>
                                  </div>
                                </div>
                               ))}


                              </div>
                              {/* Accordion END */}
                            </div>

                            <div
                              className="tab-pane fade"
                              id="course-pills-2"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-2"
                            >
                              <div className="card">
                                <div className="card-header border-bottom p-0 pb-3">
                                  <div className="d-sm-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 p-3">All Notes</h4>
                                    {/* Add Note Modal */}
                                    <button type="button" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                      Add Note <i className='fas fa-pen'></i>
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                              Add New Note <i className='fas fa-pen'></i>
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                          </div>
                                          <div className="modal-body">
                                            <form onSubmit={handleNoteCreateSubmit}>
                                              <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                  Note Title
                                                </label>
                                                <input 
                                                type="text" 
                                                className="form-control"
                                                name="title"
                                                onChange={handleNoteChange} />
                                              </div>
                                              <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">
                                                  Note Content
                                                </label>

                                                <textarea 
                                                className='form-control'  
                                                id="" 
                                                cols="30" 
                                                rows="10"
                                                name="note"
                                                onChange={handleNoteChange} >
                                                </textarea>
                                              </div>
                                              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal" ><i className='fas fa-arrow-left'></i> Close</button>
                                              <button type="submit" className="btn btn-primary">Save Note <i className='fas fa-check-circle'></i></button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body p-0 pt-3">
                                  {/* Note item start */}
                                  {course.note?.map((n,index)=>(
                                    <div className="row g-4 p-3">
                                    <div className="col-sm-11 col-xl-11 shadow p-3 m-3 rounded">
                                      <h5>{n.title}</h5>
                                      <p>
                                        {n.note}
                                      </p>
                                      {/* Buttons */}
                                      <div className="hstack gap-3 flex-wrap">
                                        <a onClick={()=>handleNoteShow(n)} className="btn btn-success mb-0">
                                          <i className="bi bi-pencil-square me-2" /> Edit
                                        </a>
                                        <a 
                                        onClick={()=>handleNoteDelete(n.id)} 
                                        className="btn btn-danger mb-0">
                                          <i className="bi bi-trash me-2" /> Delete
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  ))}

                                  {course?.note?.length < 1 &&(
                                     <div className="col-sm-11 col-xl-11 shadow p-3 m-3 rounded">
                                       <h5 className='ms-5'>No notes available</h5>
                                      </div>
                                    
                                  )}
                                  <hr />
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="course-pills-3"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-3"
                            >
                              <div className="card">
                                {/* Card header */}
                                <div className="card-header border-bottom p-0 pb-3">
                                  {/* Title */}
                                  <h4 className="mb-3 p-3">Discussion</h4>
                                  <form className="row g-4 p-3">
                                    {/* Search */}
                                    <div className="col-sm-6 col-lg-9">
                                      <div className="position-relative">
                                        <input 
                                        className="form-control pe-5 bg-transparent" 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search"
                                        onChange={handleSearchQuestion} />
                                        <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                                          <i className="fas fa-search fs-6 " />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                      <a
                                        onClick={handleQuestionShow}
                                        className="btn btn-primary mb-0 w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalCreatePost"
                                      >
                                        Ask Question
                                      </a>
                                    </div>
                                  </form>
                                </div>
                                {/* Card body */}
                                <div className="card-body p-0 pt-3">
                                  <div className="vstack gap-3 p-3">
                                    {/* Question item START */}

                                    {questions?.map((q,index)=>(
                                    <div className="shadow rounded-3 p-3">
                                      <div className="d-sm-flex justify-content-sm-between mb-3">
                                        <div className="d-flex align-items-center">
                                          <div className="avatar avatar-sm flex-shrink-0">
                                            <img
                                              src={q.profile.image}
                                              className="avatar-img rounded-circle"
                                              alt="avatar"
                                              style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
                                            />
                                          </div>
                                          <div className="ms-2">
                                            <h6 className="mb-0">
                                              <a href="#" className='text-decoration-none text-dark'>{q.profile.full_name}</a>
                                            </h6>
                                            <small>{moment(q.date).format("DD MMM, YYYY")}</small>
                                          </div>
                                        </div>
                                      </div>
                                      <h5>{q.title}</h5>
                                      <button className='btn btn-light btn-sm mb-3 mt-3' onClick={()=> handleConversationShow(q)}>Reply</button>
                                    </div>
                                    ))}

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="course-pills-4"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-4"
                            >
                              <div className="card">
                                {/* Card header */}
                                <div className="card-header border-bottom p-0 pb-3">
                                  {/* Title */}
                                  <h4 className="mb-3 p-3">Leave a Review</h4>
                                  <div className="mt-2">
                                    {!studentReview && (
                                    <form className="row g-3 p-3" onSubmit={handleCreateReviewSubmit}>

                                      {/* Rating */}
                                      <div className="col-12 bg-light-input">
                                        <select
                                          id="inputState2"
                                          className="form-select js-choice"
                                          name='rating'
                                          onChange={handleCreateReviewChange}
                                        >
                                          <option value={1}>★☆☆☆☆ (1/5)</option>
                                          <option value={2}>★★☆☆☆ (2/5)</option>
                                          <option value={3}>★★★☆☆ (3/5)</option>
                                          <option value={4}>★★★★☆ (4/5)</option>
                                          <option value={5}>★★★★★ (5/5)</option>
                                        </select>
                                      </div>
                                      {/* Message */}
                                      <div className="col-12 bg-light-input">
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          placeholder="Your review"
                                          rows={3}
                                          defaultValue={""}
                                          name='review'
                                          onChange={handleCreateReviewChange}
                                        />
                                      </div>
                                      {/* Button */}
                                      <div className="col-12">
                                        <button type="submit" className="btn btn-primary mb-0">
                                          Post Review
                                        </button>
                                      </div>
                                    </form>
                                    )}

                                    {studentReview && (
                                    <form className="row g-3 p-3" onSubmit={handleReviewUpdateSubmit}>

                                      {/* Rating */}
                                      <div className="col-12 bg-light-input">
                                        <select
                                          id="inputState2"
                                          className="form-select js-choice"
                                          name='rating'
                                          onChange={handleCreateReviewChange}
                                          value={course.review?.rating}
                                        >
                                          <option value={1}>★☆☆☆☆ (1/5)</option>
                                          <option value={2}>★★☆☆☆ (2/5)</option>
                                          <option value={3}>★★★☆☆ (3/5)</option>
                                          <option value={4}>★★★★☆ (4/5)</option>
                                          <option value={5}>★★★★★ (5/5)</option>
                                        </select>
                                      </div>
                                      {/* Message */}
                                      <div className="col-12 bg-light-input">
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          placeholder="Your review"
                                          rows={3}
                                          name='review'
                                          onChange={handleCreateReviewChange}
                                          defaultValue={studentReview.review}
                                        />
                                      </div>
                                      {/* Button */}
                                      <div className="col-12">
                                        <button type="submit" className="btn btn-primary mb-0">
                                          Update Review
                                        </button>
                                      </div>
                                    </form>
                                    )}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>



      {/* Lecture Modal */}
      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: {variantItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer url={variantItem?.file} controls playing width={"100%"} height={"100%"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>


      {/* Note Edit Modal */}
      <Modal show={noteShow} size='lg' onHide={handleNoteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Note: {selectedNote?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e)=>handleNoteEditSubmit(e,selectedNote?.id)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Note Title</label>
              <input 
              defaultValue={selectedNote?.title} 
              name='title'
              onChange={handleNoteChange} 
              type="text" 
              className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Note Content</label>
              <textarea 
              defaultValue={selectedNote?.note} 
              name='note'
              onChange={handleNoteChange} 
              className='form-control' 
              cols="30" 
              rows="10"></textarea>
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={null}><i className='fas fa-arrow-left'></i> Close</button>
            <button type="submit" className="btn btn-primary">Save Note <i className='fas fa-check-circle'></i></button>
          </form>
        </Modal.Body>
      </Modal>

      {/* conversation */}

      <Modal show={ConversationShow} size='lg' onHide={handleConversationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Question: {selectedQuestion?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border p-2 p-sm-4 rounded-3">
            <ul className="list-unstyled mb-0" style={{ overflowY: "scroll", height: "500px" }}>

              {selectedQuestion?.messages?.map((s,index)=>(

              <li className="comment-item mb-3">
                <div className="d-flex">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <a href="#">
                      <img 
                      className="avatar-img rounded-circle" 
                       
                      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
                      alt="womans image"
                      src={
                        s.profile.image?.startsWith("http://127.0.0.1:8000")
                          ? s.profile.image
                          : `http://127.0.0.1:8000${s.profile.image}`
                         } 
                      />
                    </a>
                  </div>
                  <div className="ms-2">
                    {/* Comment by */}
                    <div className="bg-light p-3 rounded w-100">
                      <div className="d-flex w-100 justify-content-center">
                        <div className="me-2 ">
                          <h6 className="mb-1 lead fw-bold">
                            <a href="#!" className='text-decoration-none text-dark'>{s.profile.full_name}</a><br />
                            <span style={{ fontSize: "12px", color: "gray" }}>{moment(s.date).format("DD MMM, YYYY")}</span>
                          </h6>
                          <p className="mb-0 mt-3  ">{s.message}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
              ))}

              <div ref={lastElementRef}></div>
            </ul>

            <form class="w-100 d-flex" onSubmit={handleQuestionMessageSubmit}>
              <textarea 
              name='message' 
              onChange={handleQuestionChange}
              class="one form-control pe-4 bg-light w-75" 
              id="autoheighttextarea" 
              rows="2" 
              placeholder="What's your question?">
              
              </textarea>
              <button class="btn btn-primary ms-2 mb-0 w-25" type="submit">Post<i className='fas fa-paper-plane'></i></button>
            </form>

            {/* <form class="w-100">
              <input name='title' type="text" className="form-control mb-2" placeholder='Question Title' />
              <textarea name='message' class="one form-control pe-4 mb-2 bg-light" id="autoheighttextarea" rows="5" placeholder="What's your question?"></textarea>
              <button class="btn btn-primary mb-0 w-25" type="button">Post <i className='fas fa-paper-plane'></i></button>
            </form> */}

          </div>
        </Modal.Body>
      </Modal>

      {/* Add Question  */}
      <Modal show={addQuestionShow} size='lg' onHide={handleQuestionClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAskQuestionSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Ask Question</label>
              <input 
              name='title'
              onChange={handleQuestionChange} 
              type="text" 
              className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Message</label>
              <textarea 
              name='message'
              onChange={handleQuestionChange} 
              className='form-control' 
              cols="30" 
              rows="10"></textarea>
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={handleQuestionClose}><i className='fas fa-arrow-left'></i> Close</button>
            <button type="submit" className="btn btn-primary">Save Note <i className='fas fa-check-circle'></i></button>
          </form>
        </Modal.Body>
      </Modal>

      <BaseFooter />
    </>
  )
}

export default CourseDetail
