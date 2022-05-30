export const BadgeStatusCode = ({ statusCode }: { statusCode: string }) => {
  if (statusCode === '200') {
    return <div className="h-3 w-3 bg-green-500 rounded-full mr-2" />;
  }

  return <div className="h-3 w-3 bg-red-500 rounded-full mr-2" />;
};
