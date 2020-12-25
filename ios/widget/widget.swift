import WidgetKit
import SwiftUI

struct SharedData: Decodable {
  let totalCost: Int
  let categories: [Category]
}

struct Category: Identifiable, Decodable {
  let id: Int
  let name: String
  let emoji: String
  let color: String
  let percentage: Int
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let data: SharedData
}

let testData = SharedData(totalCost: 1000, categories: [
  Category(id: 4, name: "Hello", emoji: "💻", color: "#333", percentage: 60)
])

struct Provider: TimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), data: testData)
  }

  func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date(), data: testData)
    completion(entry)
  }

  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let sharedDefaults = UserDefaults.init(suiteName: "group.com.cashflux")
    var data = testData
    
    if(sharedDefaults != nil) {
      do {
        let shared = sharedDefaults?.string(forKey: "widgetData")
        print("hello")
        print(shared)
        if(shared != nil) {
          data = try JSONDecoder().decode(SharedData.self, from: shared!.data(using: .utf8)!)
        }
      } catch {
        print(error)
      }
    }
    
    let entry = SimpleEntry(date: Date(), data: data)
    let timeline = Timeline(entries: [entry], policy: .atEnd)
    completion(timeline)
  }
}

struct widgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      VStack {
        HStack {
          Text("This month: \(entry.data.totalCost)")
            .font(.system(size: 22))
          Spacer()
        }
        GeometryReader {geometry in
          HStack(spacing: 2){
            ForEach(entry.data.categories) {category in
              ZStack {
                if(category.percentage > 1) {
                  Rectangle()
                    .fill(Color(hex: category.color))
                    .frame(width: CGFloat(category.percentage * Int(geometry.size.width) / 100), height: 40)
                    .cornerRadius(5)
                  Text(category.percentage > 8 ? category.emoji : "")
                }
              }
            }
          }
        }
      }
      .padding()
    }
}

@main
struct widget: Widget {
    let kind: String = "widget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            widgetEntryView(entry: entry)
        }
        .configurationDisplayName("This month")
        .description("Visualize your expenses this month")
        .supportedFamilies([.systemMedium])
    }
}



extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
