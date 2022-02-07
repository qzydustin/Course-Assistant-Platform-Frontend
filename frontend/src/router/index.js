import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login'),
            meta: {
                isLogin: false
            }
        },
        {
            path: '/signup',
            name: 'Signup',
            component: () => import('@/views/Signup'),
            meta: {
                isLogin: false
            }
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/404.vue'),
            meta: {
                isLogin: false
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
            meta: {
                isLogin: true
            },
            redirect: {
                name: 'HomePage'
            },
            children: [
                {
                    path: '/home/index',
                    name: 'HomePage',
                    component: () => import('@/components/home/HomePage'),
                    meta: {
                        isLogin: true
                    },
                },
                {
                    path: '/home/course/manage',
                    name: 'CourseManage',
                    component: () => import('@/components/home/course/CourseManage'),
                    meta: {
                        isLogin: true
                    },
                },
                {
                    path: '/home/course/current',
                    name: 'CurrentCourse',
                    component: () => import('@/components/home/course/CurrentCourse'),
                    meta: {
                        isLogin: true
                    }
                },
                {
                    path: '/course',
                    name: 'TeacherCoursePage',
                    component: () => import('@/components/course/teacher/CoursePage'),
                    meta: {
                        isLogin: true
                    },
                    children:[
                        {
                            path: '/information',
                            name: 'TeacherInformation',
                            component: () => import('@/components/course/teacher/Information'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/data',
                            name: 'TeacherData',
                            component: () => import('@/components/course/teacher/Data'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/discussion',
                            name: 'TeacherDiscussion',
                            component: () => import('@/components/course/teacher/Discussion'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/work',
                            name: 'TeacherWork',
                            component: () => import('@/components/course/teacher/Work'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/exam',
                            name: 'TeacherExam',
                            component: () => import('@/components/course/teacher/Exam'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/grade',
                            name: 'TeacherGrade',
                            component: () => import('@/components/course/teacher/Grade'),
                            meta: {
                                isLogin: true
                            }
                        }
                    ]
                },
                {
                    path: '/student/course',
                    name: 'StudentCoursePage',
                    component: () => import('@/components/course/student/CoursePage'),
                    meta: {
                        isLogin: true
                    },
                    children:[
                        {
                            path: '/student/information',
                            name: 'StudentInformation',
                            component: () => import('@/components/course/student/Information'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/student/data',
                            name: 'StudentData',
                            component: () => import('@/components/course/student/Data'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/student/discussion',
                            name: 'StudentDiscussion',
                            component: () => import('@/components/course/student/Discussion'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/student/work',
                            name: 'StudentWork',
                            component: () => import('@/components/course/student/Work'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/student/exam',
                            name: 'StudentExam',
                            component: () => import('@/components/course/student/Exam'),
                            meta: {
                                isLogin: true
                            }
                        },
                        {
                            path: '/student/grade',
                            name: 'StudentGrade',
                            component: () => import('@/components/course/student/Grade'),
                            meta: {
                                isLogin: true
                            }
                        }
                    ]
                },
            ]
        },
    ]

})
