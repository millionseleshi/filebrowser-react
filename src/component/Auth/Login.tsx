import { Auth } from "@supabase/auth-ui-react";
import { supabaseClient } from "../../config/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  return (
    <div className="card lg:card-compact bg-base-100 shadow-xl">
      <div className="card-body col-span-3">
        <Auth
          supabaseClient={supabaseClient}
          providers={[]}
          appearance={{ theme: ThemeSupa }}
        ></Auth>
      </div>
    </div>
  );
};

export default Login;
