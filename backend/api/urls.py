from django.urls  import path
from api import views  as api_views
from  rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
# authentication urls
    path("user/token/",api_views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path("user/token/refresh",TokenRefreshView.as_view(),name='token_refresh'),
    path("user/register/",api_views.RegisterView.as_view(),name='user_register'),
    path("user/password-reset/<email>",api_views.PasswordResetEmailVerifyAPIView.as_view(),name='password_reset'),
    path("user/password-change/",api_views.PasswordChangeAPIView.as_view(),name='password_change'),
    path("user/change-password/",api_views.ChangePasswordAPIView.as_view(),name='change_password'),
    path("user/profile-update/<user_id>",api_views.ProfileUpdateAPIView.as_view(),name='profile_update'),

# core urls
    path("course/category/",api_views.CategoryListAPIview.as_view(),name='category_list'),
    path("course/course-list/",api_views.CourseListAPIview.as_view(),name='course_list'),
    path("course/course-detail/<slug>/",api_views.CourseDetailAPIview.as_view(),name='course_detail'),
    path("course/search/",api_views.SearchCourseAPIView.as_view(),name='course_search'),
    path("course/cart/",api_views.CartAPIview.as_view(),name='cart'),
    path("course/cart-list/<cart_id>/",api_views.CartListAPIView.as_view(),name='cart_list'),
    path("course/cart-item-delete/<cart_id>/<item_id>/",api_views.CartItemDeleteAPIView.as_view(),name='cart_item_delete'),
    path("cart/stats/<cart_id>/",api_views.CartStatsAPIView.as_view(),name='cart_stats'),
    path("order/create-order/",api_views.CreateOrderAPIView.as_view(),name='create_order'),
    path("order/check-out/<oid>/",api_views.CheckOutAPIView.as_view(),name='check_out'),
    path("order/coupon/",api_views.CouponApplyAPIView.as_view(),name='coupon_apply'),
    path("payment/stripe-checkout/<order_oid>",api_views.StripeCHeckOutAPIView.as_view(),name='payment-stripe'),
    path("payment/payment-success/",api_views.PaymentSuccessAPIView.as_view(),name='payment-success'),

#student api urls
    path("student/summary/<user_id>",api_views.StudentSummaryAPIView.as_view(),name='student_summary'),
    path("student/course-list/<user_id>",api_views.StudentCourseListAPIView.as_view(),name='student_course_list'),
    path("student/course-Detail/<user_id>/<enrollment_id>",api_views.StudentCourseDetailAPIView.as_view(),name='student_course_Detail'),
    path("student/course-completed-lesson/",api_views.StudentCompletedLessonCreateAPIView.as_view(),name='student_course_completed_lesson'),
    path("student/course-note/<user_id>/<enrollment_id>/",api_views.StudentNoteCreateAPIView.as_view(),name='student_course_note_create'),
    path("student/course-note-detail/<user_id>/<enrollment_id>/<note_id>",api_views.StudentNoteDetailAPIView.as_view(),name='student_course_note_Detail'),
    path("student/course-review-create/",api_views.StudentRatingAPIView.as_view(),name='student_course_review_Create'),
    path("student/course-review-detail/<user_id>/<review_id>/",api_views.StudentRatingDetailAPIView.as_view(),name='student_course_review_Detail'),
    path("student/wishlist/<user_id>/",api_views.StudentWishListAPIView.as_view(),name='student_wishlist'),
    path("student/question-answer-list-create/<course_id>/",api_views.QuestionAnswerListCreateAPIView.as_view(),name='question-answer'),
    path("student/question-answer-message-send/",api_views.QuestionAnswerMessageSendAPIView.as_view(),name='question-message'),


#teacher api urls
    path("teacher/summary/<teacher_id>/",api_views.TeacherSummaryAPIView.as_view(),name='teacher-summary'),
    path("teacher/course-list/<teacher_id>/",api_views.TeacherCourseListAPIView.as_view(),name='course-list'),
    
    path("teacher/review-list/<teacher_id>/",api_views.TeacherReviewListAPIView.as_view(),name='review-list'),
    path("teacher/review-detail/<teacher_id>/<review_id>/",api_views.TeacherReviewDetailAPIView.as_view(),name='review-detail'),
    path("teacher/student-list/<teacher_id>/",api_views.TeacherStudentListAPIView.as_view({'get': 'list'}),name='student-list'),
    path("teacher/monthly-earning/<teacher_id>/",api_views.TotalMonthlyEarningAPIView,name='student-list'),
    path("teacher/best-selling-course-list/<teacher_id>/",api_views.TeacherBestSellingCourseAPIView.as_view({'get': 'list'}),name='best-selling-course'),
    path("teacher/course-order-list/<teacher_id>/",api_views.TeacherCourseOrderListAPIView.as_view(),name='course_order_list'),
    path("teacher/question-answer-list/<teacher_id>/",api_views.TeacherQuestionAnswerListAPIView.as_view(),name='question-answer-list'),
    path("teacher/coupon-list/<teacher_id>/",api_views.TeacherCouponListCreateAPIView.as_view(),name='teacher_coupon_list'),
    path("teacher/coupon-detail/<teacher_id>/<coupon_id>/",api_views.TeacherCouponDetailAPIView.as_view(),name='coupon_detail'),
    path("teacher/notifi-list/<teacher_id>/",api_views.TeacherNotificationListAPIView.as_view(),name='noti_list'),
    path("teacher/notifi-detail/<teacher_id>/<noti_id>/",api_views.TeacherNotificationDetailAPIView.as_view(),name='noti_detail'),
    path("teacher/course-detail/<course_id>/",api_views.TeacherCourseDetailAPIView.as_view(),name='teacher_course_detail'),

    path("teacher/course/variant-delete/<variant_id>/<teacher_id>/<course_id>/",api_views.CourseVariantDeleteAPIView.as_view(),name='course_variant_delete'),
    path("teacher/course/variant-item-delete/<variant_id>/<variant_item_id>/<teacher_id>/<course_id>/",api_views.CourseVariantItemDeleteAPIVIew.as_view(),name='course_variant_item_delete'),
    path("teacher/course-create/",api_views.CourseCreateAPIView.as_view()),
    path("teacher/course-update/<teacher_id>/<course_id>/",api_views.CourseUpdateAPIView.as_view())


    
]
