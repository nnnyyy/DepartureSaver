package com.sononpos.departuresaver;

import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;

import com.sononpos.departuresaver.SubPages.ParkingFragment;

public class MainActivity extends AppCompatActivity implements ParkingFragment.OnFragmentInteractionListener {

    final static String TAG = "DepartureSaver";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomNavigationView bnv = (BottomNavigationView)findViewById(R.id.bottom_nav_view);
        bnv.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                return ProcNavItemSelect( item );
            }
        });
    }

    protected boolean ProcNavItemSelect( MenuItem item ) {
        switch(item.getItemId()) {
            case R.id.action_parking:
                SwitchFragment(0);
                break;
            case R.id.action_congestion:
                break;
            case R.id.action_info:
                break;
        }

        return true;
    }

    protected void SwitchFragment( int index ){
        FragmentManager man = getSupportFragmentManager();
        man.beginTransaction().replace(R.id.fragment_container, ParkingFragment.newInstance("","")).commit();
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
