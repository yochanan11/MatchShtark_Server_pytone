import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
  PieChart, Pie, LineChart, Line, Cell, Legend
} from "recharts";
import { TrendingUp, Target, BarChart3, Heart } from "lucide-react";

const COLORS = [
  "#D4AF37", "#8B4513", "#FF6B35", "#4ECDC4", "#45B7D1",
  "#96CEB4", "#FFEAA7", "#DDA0DD", "#F39C12", "#E74C3C",
  "#9B59B6", "#3498DB", "#1ABC9C", "#2ECC71", "#F1C40F",
  "#E67E22", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5"
];

function FeatureImportancePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/model/importance-data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #F3E8FF'
        }}>
          <p style={{ color: '#1F2937', fontWeight: '500', margin: 0 }}>{label}</p>
          <p style={{ color: '#D97706', margin: '4px 0 0 0' }}>
            חשיבות: {(payload[0].value * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const headerStyle = {
    background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
    borderBottom: '1px solid #F3E8FF',
    padding: '32px 0'
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '24px',
    border: '1px solid #FEF3C7',
    marginBottom: '24px'
  };

  const statCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    padding: '24px',
    border: '1px solid #FEF3C7',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  };

  if (loading) {
    return (
      <div style={{
        ...containerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Heart style={{ width: '48px', height: '48px', color: '#D97706', margin: '0 auto 16px' }} />
          <p style={{ color: '#92400E', fontSize: '18px' }}>טוען נתוני חשיבות מאפיינים...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{
        ...containerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Target style={{ width: '48px', height: '48px', color: '#D97706', margin: '0 auto 16px' }} />
          <p style={{ color: '#92400E', fontSize: '18px' }}>אין נתונים זמינים</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{
              color: '#374151',
              fontSize: '32px',
              fontFamily: 'serif',
              letterSpacing: '2px',
              marginRight: '16px'
            }}>

            </div>
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0 0 16px 0'
          }}>
            📊 השפעת מאפיינים על החלטות המודל
          </h1>
          <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            גלה אילו מאפיינים הכי משפיעים על ההתאמות המושלמות שלנו
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={statCardStyle}>
            <TrendingUp style={{ width: '32px', height: '32px', color: '#D97706', marginLeft: '12px' }} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>דיוק המודל</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#D97706', margin: '4px 0 0 0' }}>94.2%</p>
            </div>
          </div>
          <div style={statCardStyle}>
            <Target style={{ width: '32px', height: '32px', color: '#D97706', marginLeft: '12px' }} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>התאמות מוצלחות</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#D97706', margin: '4px 0 0 0' }}>1,247</p>
            </div>
          </div>
          <div style={statCardStyle}>
            <BarChart3 style={{ width: '32px', height: '32px', color: '#D97706', marginLeft: '12px' }} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>מאפיינים פעילים</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#D97706', margin: '4px 0 0 0' }}>{data.length}</p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Bar Chart */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <BarChart3 style={{ width: '24px', height: '24px', color: '#D97706', marginLeft: '8px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                תרומת מאפיינים לפי עמודות
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  stroke="#6b7280"
                />
                <YAxis
                  dataKey="feature"
                  type="category"
                  width={100}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="importance"
                  fill="#D4AF37"
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList
                    dataKey="importance"
                    position="right"
                    formatter={(value) => `${(value * 100).toFixed(1)}%`}
                    fill="#6b7280"
                    fontSize={11}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Target style={{ width: '24px', height: '24px', color: '#D97706', marginLeft: '8px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                פילוח מאפיינים
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="importance"
                    nameKey="feature"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Custom Legend */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '8px',
                width: '100%',
                marginTop: '16px'
              }}>
                {data.map((entry, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    fontSize: '12px'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: COLORS[index % COLORS.length],
                      marginLeft: '8px',
                      borderRadius: '2px',
                      border: '1px solid white'
                    }}></div>
                    <span style={{ color: '#374151', fontWeight: '500' }}>
                      {entry.feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <TrendingUp style={{ width: '24px', height: '24px', color: '#D97706', marginLeft: '8px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
              מגמת חשיבות מאפיינים
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="feature"
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                stroke="#6b7280"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="importance"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ fill: '#D4AF37', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#B8860B', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #F3E8FF'
          }}>
            <Heart style={{ width: '32px', height: '32px', color: '#D97706', margin: '0 auto 12px' }} />
            <p style={{ color: '#374151', fontSize: '18px', fontWeight: '500', margin: '0 0 8px 0' }}>
              "כל התאמה מושלמת מתחילה בהבנה מעמיקה"
            </p>
            <p style={{ color: '#6B7280', margin: 0 }}>Match Shtark - בינה מלאכותית עם נשמה יהודית</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureImportancePage;