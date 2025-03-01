'use client';
import { socials } from '@/const/constant';
import MentorSocialLinks from '../pages/mentor-details/MentorSocialLinks';

import BannerImage from '@/assets/images/banner.svg';
import { Edit } from 'lucide-react';
import { Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/redux/features/user/userApi';
import { toast } from 'react-toastify';
import { getImageUrl } from '@/utils/getImageUrl';
const ProfileBanner = ({ needUpload = false }: { needUpload?: boolean }) => {
      const { data: profile } = useGetUserProfileQuery(undefined);
      const [updateBanner] = useUpdateUserProfileMutation();

      const [previewImage, setPreviewImage] = useState<undefined | string>(BannerImage.src);
      const handlePreview = async (file: any) => {
            try {
                  const formData = new FormData();
                  formData.append('banner', file);
                  const res = await updateBanner(formData).unwrap();
                  if (res?.success) {
                        toast.success(res?.message);
                  }
            } catch (error: any) {
                  toast.error(error?.data?.message || 'Something went wrong');
            }
            console.log(file);
      };
      useEffect(() => {
            if (profile?.banner) {
                  setPreviewImage(getImageUrl(profile?.banner));
            }
      }, [profile]);
      return (
            <div>
                  <div
                        style={{
                              backgroundImage: `url(${previewImage})`,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              width: '100%',
                        }}
                        className="bg-cover relative bg-center bg-no-repeat h-[150px] md:h-[250px] w-full"
                  >
                        {needUpload && (
                              <div className="absolute  cursor-pointer top-4 right-4 bg-white w-8 h-8 rounded flex items-center justify-center">
                                    <Upload
                                          showUploadList={false} // Hide the upload list
                                          onChange={({ file }) => handlePreview(file.originFileObj!)}
                                          className="flex items-center justify-center w-full h-full"
                                    >
                                          <Edit className="size-5 text-black" />
                                    </Upload>
                              </div>
                        )}
                        <MentorSocialLinks socials={socials} />
                  </div>
            </div>
      );
};

export default ProfileBanner;
