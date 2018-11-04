const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()   
.add('home', '/', 'index')
.add('admin')
.add('profile')
.add('blog')
.add('report')
.add('lesson_class', '/report/lesson_class', 'report/lesson_class')
