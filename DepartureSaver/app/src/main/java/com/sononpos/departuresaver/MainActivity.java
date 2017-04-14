package com.sononpos.departuresaver;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;

import com.sononpos.departuresaver.Helper.SimpleItemTouchHelperCallback;
import com.sononpos.departuresaver.Helper.StartDragListener;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements StartDragListener {

    final static String TAG = "DepartureSaver";
    private RecyclerView mRecyclerView;
    private RecyclerView.LayoutManager mLayoutManager;
    private MyRecyclerAdapter mAdapter;

    private ItemTouchHelper mItemTouchHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mRecyclerView = (RecyclerView)findViewById(R.id.my_recycler_view);
        mRecyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);
        List<String> aTestList = new ArrayList<>();
        for(int i = 0 ; i < 10 ; ++i ) {
            aTestList.add("Test Item : " + i);
        }
        mAdapter = new MyRecyclerAdapter(aTestList, R.layout.my_viewholder_layout, this);
        mRecyclerView.setAdapter(mAdapter);

        //  Init ItemTouchHelper
        SimpleItemTouchHelperCallback callback = new SimpleItemTouchHelperCallback(mAdapter);
        mItemTouchHelper = new ItemTouchHelper(callback);
        mItemTouchHelper.attachToRecyclerView(mRecyclerView);
    }

    @Override
    public void OnStartDrag(RecyclerView.ViewHolder v) {
        mItemTouchHelper.startDrag(v);
    }
}
