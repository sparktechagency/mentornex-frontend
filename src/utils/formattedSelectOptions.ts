const formattedSelectOptions = (options: { _id: string; name: string }[]) => {
      return options.map((option) => ({
            value: option._id,
            label: option.name,
      }));
};

export default formattedSelectOptions;
