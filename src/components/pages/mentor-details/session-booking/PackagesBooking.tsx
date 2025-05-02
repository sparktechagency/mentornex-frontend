import { usePurchasePackageMutation } from '@/redux/features/purchase/purchaseApi';
import { Button, Radio } from 'antd';
import React from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { toast } from 'react-toastify';

const PackagesBooking = ({ packages }: { packages: any[] }) => {
      const [selectedPackage, setSelectedPackage] = React.useState<string>(packages[0]?._id || '');
      const [purchasePackage, { isLoading }] = usePurchasePackageMutation();

      const options = packages.map((pkg) => ({
            label: pkg.title,
            value: pkg._id,
      }));

      const currentPackage = packages.find((pkg) => pkg._id === selectedPackage);

      if (!packages || packages.length === 0) {
            return (
                  <div className="p-2 text-center">
                        <p className="text-gray-600 text-lg">No packages available at this time</p>
                        <p className="text-gray-500 text-sm mt-2">Please check back later for available packages</p>
                  </div>
            );
      }

      const handlePurchase = async (id: string) => {
            try {
                  const res = await purchasePackage({ id }).unwrap();
                  console.log(res);
                  if (res.success) {
                        window.open(res.data, '_blank');
                  }
            } catch (error: any) {
                  toast.error(error.data.message || 'Failed to purchase package');
            }
      };
      return (
            <div className="w-full">
                  <div className="p-4 space-y-6">
                        <div className="w-full">
                              <Radio.Group
                                    block
                                    options={options}
                                    value={selectedPackage}
                                    onChange={(e) => setSelectedPackage(e.target.value)}
                                    optionType="button"
                                    buttonStyle="solid"
                                    size="large"
                                    className="w-full overflow-hidden"
                              />
                        </div>

                        {currentPackage && (
                              <>
                                    <div className="space-y-4">
                                          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                                                ${currentPackage.amount}{' '}
                                                <span className="text-2xl text-gray-600">/{currentPackage.sessions} sessions</span>
                                          </h1>
                                          <p className="text-gray-600 text-lg leading-relaxed">{currentPackage.description}</p>
                                    </div>

                                    <ul className="space-y-4  text-gray-700">
                                          {currentPackage.features.map((feature: string, index: number) => (
                                                <li key={index} className="flex items-center space-x-3 text-lg">
                                                      <BsCheck2 className="text-primary" size={20} /> <span>{feature}</span>
                                                </li>
                                          ))}
                                    </ul>

                                    <Button
                                          onClick={() => handlePurchase(currentPackage._id)}
                                          type="primary"
                                          block
                                          className="h-12 text-lg font-medium bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
                                    >
                                          {isLoading ? 'Loading...' : 'Buy Now'}
                                    </Button>
                              </>
                        )}
                  </div>
            </div>
      );
};

export default PackagesBooking;
