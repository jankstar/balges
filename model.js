// Model

$data.Class.define("balges.Session", $data.Entity, null, {
    SessionId: { type: "id", key: true, computed: true, nullable: false },
    Description: { type: "string" },
    Status: { type: "string" },
    Courses: { type: Array, elementType: "balges.Course", inverseProperty: "SessionId" },
    Persons: { type: Array, elementType: "balges.Person", inverseProperty: "SessionId" },
    }, null);

$data.Class.define("balges.Person", $data.Entity, null, {
    PersonId: { type: "id", key: true, computed: true, nullable: false },
    FirstName: { type: "string" },
    LastName:  { type: "string" },
    Email: { type: "string" },
    SessionId: { type: "balges.Session", required: true, inverseProperty: "Persons" },
    CoursesAsTutor: { type: Array, elementType: "balges.Course", inverseProperty: "Tutor" }
}, null);

$data.Class.define("balges.Course", $data.Entity, null, {
    CourseId: { type: "id", key: true, computed: true, nullable: false },
    Description: { type: "string" },
    Status: { type: "string" },
    Tutor: { type: "balges.Person", required: true, inverseProperty: "CoursesAsTutor"},
    SessionId: { type: "balges.Session", required: true, inverseProperty: "Courses" }
}, null);

$data.Class.defineEx("balges.Context", [$data.EntityContext,$data.ServiceBase], null, {
    Sessions: { type: $data.EntitySet, elementType: "balges.Session" },
    Courses: { type: $data.EntitySet, elementType: "balges.Course" },
    Persons: { type: $data.EntitySet, elementType: "balges.Person" }
});

exports = balges.Context