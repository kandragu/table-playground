const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  {
    key: "p-type",
    label: "Payment Type",
    type: "radio" as "radio" | "checkbox" | undefined,
  },
  {
    key: "comp",
    label: "Services components",
    type: "checkbox" as "radio" | "checkbox" | undefined,
  },
  {
    key: "search",
    label: "Search",
    type: "search" as "radio" | "checkbox" | "search" | undefined,
    render: (value: string, row: any) => (
      <span>
        <input type="search" id="site-search" name="q" />
        <button>Search</button>
      </span>
    ),
  },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    "p-type": ["pre-paid", "post-paid"],
    comp: ["mobile", "tv", "internet"],
    search: "month",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    "p-type": ["pre-paid"],
    comp: ["tv", "internet"],
  },
  {
    id: 3,
    name: "Jim Johnson",
    age: 27,
    "p-type": ["post-paid"],
    comp: ["mobile", "internet"],
  },
  /*{
    id: 4,
    name: "Jenny Williams",
    age: 31,
    "p-type": ["pre-paid", "post-paid"],
    comp: ["mobile", "tv"],
  },
  {
    id: 5,
    name: "Jack Brown",
    age: 28,
    "p-type": ["pre-paid"],
    comp: ["mobile", "tv", "internet"],
  },
  {
    id: 6,
    name: "Julia Jones",
    age: 32,
    "p-type": ["post-paid"],
    comp: ["tv", "internet"],
  },
  {
    id: 7,
    name: "Jeff Miller",
    age: 29,
    "p-type": ["pre-paid", "post-paid"],
    comp: ["mobile", "internet"],
  },
  {
    id: 8,
    name: "Jill Davis",
    age: 33,
    "p-type": ["pre-paid"],
    comp: ["mobile", "tv"],
  },
  {
    id: 9,
    name: "Jake Wilson",
    age: 26,
    "p-type": ["post-paid"],
    comp: ["mobile", "tv", "internet"],
  },
  {
    id: 10,
    name: "Jessica Taylor",
    age: 34,
    "p-type": ["pre-paid", "post-paid"],
    comp: ["tv", "internet"],
  },*/
];

export { columns, users };
