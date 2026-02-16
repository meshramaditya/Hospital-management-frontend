export type UserRole = "admin" | "doctor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  phone: string
  email: string
  address: string
  bloodType: string
  lastVisit?: string
  medicalHistory?: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  type: string
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  diagnosis: string
  medicines: {
    name: string
    dosage: string
    duration: string
  }[]
  notes?: string
}

export interface Bill {
  id: string
  patientId: string
  patientName: string
  date: string
  consultationFee: number
  additionalServices: {
    name: string
    cost: number
  }[]
  tax: number
  total: number
  status: "pending" | "paid"
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    address: "123 Oak Street, Boston, MA 02108",
    bloodType: "O+",
    lastVisit: "2024-12-20",
    medicalHistory: "Hypertension, seasonal allergies",
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    email: "mchen@email.com",
    address: "456 Maple Avenue, Boston, MA 02109",
    bloodType: "A+",
    lastVisit: "2024-12-18",
    medicalHistory: "Type 2 diabetes, back pain",
  },
  {
    id: "P003",
    name: "Emily Rodriguez",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 345-6789",
    email: "emily.r@email.com",
    address: "789 Pine Road, Cambridge, MA 02139",
    bloodType: "B+",
    lastVisit: "2024-12-22",
    medicalHistory: "Asthma",
  },
  {
    id: "P004",
    name: "David Wilson",
    age: 56,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    email: "dwilson@email.com",
    address: "321 Elm Street, Somerville, MA 02143",
    bloodType: "AB+",
    lastVisit: "2024-12-15",
    medicalHistory: "Heart disease, high cholesterol",
  },
  {
    id: "P005",
    name: "Jennifer Martinez",
    age: 39,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    email: "jmartinez@email.com",
    address: "654 Birch Lane, Brookline, MA 02445",
    bloodType: "O-",
    lastVisit: "2024-12-19",
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Sarah Johnson",
    doctorId: "D001",
    doctorName: "Dr. James Smith",
    date: "2024-12-30",
    time: "09:00",
    status: "scheduled",
    type: "General Checkup",
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Michael Chen",
    doctorId: "D002",
    doctorName: "Dr. Lisa Brown",
    date: "2024-12-30",
    time: "10:00",
    status: "scheduled",
    type: "Diabetes Follow-up",
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Emily Rodriguez",
    doctorId: "D001",
    doctorName: "Dr. James Smith",
    date: "2024-12-30",
    time: "11:00",
    status: "scheduled",
    type: "Respiratory Consultation",
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "David Wilson",
    doctorId: "D003",
    doctorName: "Dr. Robert Taylor",
    date: "2024-12-29",
    time: "14:00",
    status: "completed",
    type: "Cardiology Consultation",
  },
  {
    id: "A005",
    patientId: "P005",
    patientName: "Jennifer Martinez",
    doctorId: "D002",
    doctorName: "Dr. Lisa Brown",
    date: "2024-12-28",
    time: "15:30",
    status: "completed",
    type: "General Checkup",
  },
]

export const mockPrescriptions: Prescription[] = [
  {
    id: "RX001",
    patientId: "P001",
    patientName: "Sarah Johnson",
    doctorId: "D001",
    doctorName: "Dr. James Smith",
    date: "2024-12-20",
    diagnosis: "Seasonal Allergies",
    medicines: [
      { name: "Cetirizine", dosage: "10mg", duration: "14 days" },
      { name: "Nasal Spray", dosage: "2 sprays", duration: "7 days" },
    ],
    notes: "Take antihistamine before bedtime. Avoid outdoor activities during high pollen count.",
  },
  {
    id: "RX002",
    patientId: "P002",
    patientName: "Michael Chen",
    doctorId: "D002",
    doctorName: "Dr. Lisa Brown",
    date: "2024-12-18",
    diagnosis: "Type 2 Diabetes Management",
    medicines: [
      { name: "Metformin", dosage: "500mg", duration: "30 days" },
      { name: "Glimepiride", dosage: "2mg", duration: "30 days" },
    ],
    notes: "Monitor blood sugar levels daily. Follow prescribed diet plan.",
  },
]

export const mockBills: Bill[] = [
  {
    id: "B001",
    patientId: "P004",
    patientName: "David Wilson",
    date: "2024-12-29",
    consultationFee: 150,
    additionalServices: [
      { name: "ECG Test", cost: 75 },
      { name: "Blood Test", cost: 50 },
    ],
    tax: 27.5,
    total: 302.5,
    status: "paid",
  },
  {
    id: "B002",
    patientId: "P005",
    patientName: "Jennifer Martinez",
    date: "2024-12-28",
    consultationFee: 100,
    additionalServices: [{ name: "X-Ray", cost: 120 }],
    tax: 22,
    total: 242,
    status: "pending",
  },
]

export const doctors = [
  { id: "D001", name: "Dr. James Smith", specialization: "General Medicine" },
  { id: "D002", name: "Dr. Lisa Brown", specialization: "Endocrinology" },
  { id: "D003", name: "Dr. Robert Taylor", specialization: "Cardiology" },
  { id: "D004", name: "Dr. Maria Garcia", specialization: "Pediatrics" },
]
