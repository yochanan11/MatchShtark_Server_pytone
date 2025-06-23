function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/users/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container p-5" dir="rtl">
      <div className="row">
        <div className="col">
          <WelcomeHeader name={user.firstName} />
          <ActionButtons setUser={setUser} />
          <ActivitySummary />
          <SmartMatches />
        </div>
      </div>
    </div>
  );
}
