package com.app_re;

import static androidx.core.app.ActivityCompat.startActivityForResult;
import static androidx.core.content.ContextCompat.getSystemService;
import static androidx.core.content.ContextCompat.getSystemServiceName;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import android.app.Activity;
import android.content.Context;
import android.app.role.RoleManager;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DialerModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    @RequiresApi(api = Build.VERSION_CODES.Q)
    private RoleManager roleManager;

    private static final int REQ_CODE = 258;
    private Promise rolePromise;

    DialerModule(ReactApplicationContext reactContext){
        super(reactContext);

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q){
            roleManager = getSystemService(reactContext, RoleManager.class);
        }

        reactContext.addActivityEventListener(this);
        Log.d("INIT", "SUCCESS");
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
        Log.d("ROLE", "REQUESTED");
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
            Log.d("RES", "SUCCESS");
        }

        else{
            rolePromise.resolve("failed");
            Log.d("RES", "FAILED");
        }
        return;
    }

    @Override
    public void onNewIntent(@NonNull Intent intent){}
}
