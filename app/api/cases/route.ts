import { medicalCases } from '@/app/lib/data/medical-cases';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty');

  let cases = medicalCases;

  if (specialty) {
    cases = cases.filter(
      (c) => c.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  return NextResponse.json({
    total: cases.length,
    cases: cases.map((c) => ({
      case_id: c.case_id,
      specialty: c.specialty,
      difficulty: c.difficulty,
      patient_name: c.patient_profile.name,
      patient_age: c.patient_profile.age,
      presenting_complaint: c.patient_profile.presenting_complaint,
    })),
  });
}