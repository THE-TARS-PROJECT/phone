package com.app_re;

import static androidx.core.app.ActivityCompat.startActivityForResult;
import static androidx.core.content.ContextCompat.getSystemService;
import static androidx.core.content.ContextCompat.startActivity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import android.app.Activity;
import android.app.ComponentCaller;
import android.app.Service;
import android.app.role.RoleManager;
import android.content.Intent;
import android.os.Build;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DialerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    @RequiresApi(api = Build.VERSION_CODES.Q)
    private final RoleManager roleManager = (RoleManager) getCurrentActivity().getSystemService(Service.ROLE_SERVICE);
    private final ReactApplicationContext ctx;
    private static final int REQ_CODE = 258;
    private Promise rolePromise;

    DialerModule(ReactApplicationContext reactContext){
        super(reactContext);
        this.ctx = reactContext;

        reactContext.addActivityEventListener(this);
    }

    // must to have function
    @NonNull
    @Override
    public String getName(){
        return "app_re";
    }

    // request dialer role if not already set
    @ReactMethod
    @RequiresApi(api = Build.VERSION_CODES.Q)
    public void requestRole(Promise promise){
        if(roleManager.isRoleAvailable(RoleManager.ROLE_DIALER)) {
            if (roleManager.isRoleHeld(RoleManager.ROLE_DIALER)) {
                promise.resolve(true);
                return;
            }

            Activity currentActivity = getCurrentActivity();
            rolePromise = promise;
            Intent roleIntent = roleManager.createRequestRoleIntent(RoleManager.ROLE_DIALER);

            if(currentActivity != null){
                startActivityForResult(currentActivity, roleIntent, REQ_CODE, null);
            }
        }
    }

    @Override
    public void onActivityResult(@NonNull Activity activity, int requestCode, int resultCode, Intent data){
        if(resultCode == Activity.RESULT_OK){
            rolePromise.resolve("success");
        }

        else{
            rolePromise.resolve("failed");
        }
        return;
    }

    @Override
    public void onNewIntent(@NonNull Intent intent){}
}
