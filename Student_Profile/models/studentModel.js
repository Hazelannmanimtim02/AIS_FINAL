export const createStudent = async (studentData) => {
   const response = await fetch(`http://localhost:4000/api/profile/${studentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    });

    if (!response.ok) {
        throw new Error('Failed to create the student record.');
    }

    return await response.json();
};

export const getStudentProfile = async (studentId) => {

    const response = await fetch(`http://localhost:4000/api/profile/${studentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = new Error('Student Profile not found in legacy system.');
        error.statusCode = response.status;
        throw error;
    }

    const profileData = await response.json();
    return profileData;
};

export const getAllProfiles = async () => {
    const response = await fetch(`http://localhost:4000/api/profile/${studentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Cannot retrieve student list.');
    }

    return await response.json();
};