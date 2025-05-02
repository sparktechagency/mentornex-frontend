import { Button, Radio } from 'antd';

const PayPerSessionBooking = ({ payPerSessions }: { payPerSessions: any }) => {
      if (!payPerSessions || payPerSessions.length === 0) {
            return (
                  <div className="p-2 text-center">
                        <p className="text-gray-600 text-lg">No sessions available at this time</p>
                        <p className="text-gray-500 text-sm mt-2">Please check back later for available sessions</p>
                  </div>
            );
      }

      return (
            <div className="p-2">
                  <Radio.Group defaultValue="Introductory Call" className="w-full space-y-4">
                        {payPerSessions.map((item: any, index: string) => (
                              <div key={index} className="border rounded-lg p-4 flex items-center">
                                    <Radio value={item.title} className="flex-grow">
                                          <span className="text-gray-800 font-medium">{item.title}</span>
                                          <p className="text-gray-500 text-sm">${item.amount}</p>
                                    </Radio>
                              </div>
                        ))}
                  </Radio.Group>

                  <Button
                        // onClick={() => setBookingModal(true)}
                        type="primary"
                        block
                        className="mt-2 bg-orange-500 hover:bg-orange-600"
                  >
                        Book Now
                  </Button>
            </div>
      );
};

export default PayPerSessionBooking;
