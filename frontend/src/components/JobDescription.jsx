import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Briefcase, MapPin, DollarSign, Calendar, Users, Clock } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`https://job-portal-oq2d.onrender.com/api/v1/application/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6'>
                <h1 className='text-3xl font-bold mb-2'>{singleJob?.title}</h1>
                <div className='flex items-center gap-4 text-sm'>
                    <span className='flex items-center'><Briefcase className='w-4 h-4 mr-1' /> {singleJob?.jobType}</span>
                    <span className='flex items-center'><MapPin className='w-4 h-4 mr-1' /> {singleJob?.location}</span>
                    <span className='flex items-center'><DollarSign className='w-4 h-4 mr-1' /> {singleJob?.salary} LPA</span>
                </div>
            </div>
            
            <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='flex gap-2'>
                        <Badge variant="secondary" className='bg-blue-100 text-blue-800'>{singleJob?.postion} Positions</Badge>
                        <Badge variant="secondary" className='bg-green-100 text-green-800'>{singleJob?.experience} yrs exp</Badge>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-full px-6 ${isApplied ? 'bg-gray-300 text-gray-600' : 'bg-purple-600 hover:bg-purple-700'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold border-b pb-2'>Job Description</h2>
                    <p className='text-gray-600'>{singleJob?.description}</p>
                    
                    <div className='grid grid-cols-2 gap-4 mt-6'>
                        <div className='flex items-center'>
                            <Calendar className='w-5 h-5 mr-2 text-gray-400' />
                            <div>
                                <p className='text-sm text-gray-500'>Posted Date</p>
                                <p className='font-medium'>{new Date(singleJob?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Users className='w-5 h-5 mr-2 text-gray-400' />
                            <div>
                                <p className='text-sm text-gray-500'>Total Applicants</p>
                                <p className='font-medium'>{singleJob?.applications?.length}</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Clock className='w-5 h-5 mr-2 text-gray-400' />
                            <div>
                                <p className='text-sm text-gray-500'>Experience Required</p>
                                <p className='font-medium'>{singleJob?.experience} years</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <DollarSign className='w-5 h-5 mr-2 text-gray-400' />
                            <div>
                                <p className='text-sm text-gray-500'>Salary</p>
                                <p className='font-medium'>{singleJob?.salary} LPA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription