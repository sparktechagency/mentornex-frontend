const generateAntdSelectFormat = (data: any) => {
      return data?.map((item: any) => ({
            label: item.name,
            value: item._id,
      }));
};

export default generateAntdSelectFormat;
