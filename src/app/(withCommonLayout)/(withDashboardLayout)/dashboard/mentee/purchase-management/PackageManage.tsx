import BookingForm from '@/components/pages/mentor-details/booking-modal/BookingForm';
import Modal from '@/components/ui/Modal';
import { getImageUrl } from '@/utils/getImageUrl';
import { Button, Table } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

const PackageManage = ({ packages }: { packages: any }) => {
      const [showBookingModal, setShowBookingModal] = useState(false);
      const columns = [
            {
                  title: 'Mentor Name',
                  dataIndex: 'mentor_id',
                  key: 'mentor_id',
                  render: (text: string, record: any) => {
                        return (
                              <div className="flex items-center space-x-2">
                                    <Image
                                          className="rounded-full size-10"
                                          src={getImageUrl(record?.mentor_id?.image)}
                                          width={50}
                                          height={50}
                                          alt="mentor"
                                    />
                                    <span>{record.mentor_id.name}</span>
                              </div>
                        );
                  },
            },
            {
                  title: 'TotalSession',
                  dataIndex: 'session',
                  key: 'session',
                  render: (session: number, record: any) => <span>{record.package_id.sessions}</span>,
            },
            {
                  title: 'Price',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (amount: number) => <span>${amount}</span>,
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => <span className="text-green-500">{status}</span>,
            },

            {
                  title: 'Purchase Date',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                  title: 'Action',
                  dataIndex: '_id',
                  key: '_id',
                  render: () => (
                        <Button onClick={() => setShowBookingModal(true)} type="primary">
                              Book Session
                        </Button>
                  ),
            },
      ];

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Purchased Packages</h2>

                  {!packages || packages.length === 0 ? (
                        <div className="text-center py-8">
                              <p className="text-gray-600">No packages purchased yet</p>
                              <p className="text-gray-500 text-sm mt-2">You can purchase packages from mentor profiles</p>
                        </div>
                  ) : (
                        <Table
                              columns={columns}
                              dataSource={packages}
                              rowKey="_id"
                              pagination={{ pageSize: 10 }}
                              className="custom-shadow"
                        />
                  )}
                  <Modal visible={showBookingModal} onCancel={() => setShowBookingModal(false)} title="Book Session" width={600}>
                        <BookingForm />
                  </Modal>
            </div>
      );
};

export default PackageManage;
